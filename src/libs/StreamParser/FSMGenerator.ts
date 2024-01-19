import { IParseResult } from './AbstractParser';
import { IState, ITranslateRule, StatePausedAction } from './IState';

enum DefaultState {
  init = 'init',
  end = 'end',
}

enum ParserError {
  RuntimeError = 'rule_runtime_error',
  RuleInputLength = 'rule_input_length',
  RuleDuplicate = 'rule_duplicate',
  StateDuplicate = 'state_duplicate',
  StateMultipleInitial = 'state_multiple_initial',
  StateNoInitial = 'state_no_initial',
  StateMultipleEnd = 'state_multiple_end',
  StateNoEnd = 'state_no_end',
  ParsingNoStateInfo = 'parsing_no_state_info',
  ParsingNoRuleInfo = 'parsing_no_rule_info',
  ParsingNoRuleInfoForInput = 'parsing_no_rule_info_for_input',
};

type RuntimeRuleMapOfState<S extends string = string> = Map<string, ITranslateRule<S>>;

type RuntimeRuleMap<S extends string = string> = Map<S, RuntimeRuleMapOfState<S>>;

const FallbackKey = 'fallback';

const analyzeStateList = <S extends string = string>(states: Array<IState<S>>): {
  initState: S,
  endState: S,
  stateMap: Map<S, IState<S>>,
} => {
  let initState: S | undefined = undefined;
  let endState: S | undefined = undefined;
  const stateMap: Map<S, IState<S>> = new Map();
  states.forEach((s: IState<S>) => {
    if (stateMap.has(s.key)) throw { type: ParserError.StateDuplicate, state: s };
    stateMap.set(s.key, s);
    if (s.init) {
      if (initState) throw { type: ParserError.StateMultipleInitial, state: s };
      initState = s.key;
    }
    if (s.end) {
      if (endState) throw { type: ParserError.StateMultipleEnd, state: s };
      endState = s.key;
    }
  });
  if (!initState) throw { type: ParserError.StateNoInitial };
  if (!endState) throw { type: ParserError.StateNoEnd };
  return {
    initState,
    stateMap,
    endState,
  };
};

const analyzeRuleList = <S extends string = string>(rules: Array<ITranslateRule<S>>): { rulesMap: RuntimeRuleMap<S>; } => {
  const rulesMap: RuntimeRuleMap<S> = new Map();

  rules.forEach((rule: ITranslateRule<S>) => {
    if (!rulesMap.has(rule.from)) {
      rulesMap.set(rule.from, new Map<string, ITranslateRule<S>>());
    }
    const sr = rulesMap.get(rule.from);
    if (!sr) throw { type: ParserError.RuntimeError, rule };

    if (rule.input && typeof rule.input === 'string') {
      if (rule.input.length !== 1) throw { ype: ParserError.RuleInputLength, rule };
      if (sr.has(rule.input)) throw { type: ParserError.RuleDuplicate, rule };

      sr.set(rule.input, rule);
    } else if (rule.fallback) {
      if (sr.has(FallbackKey)) throw { type: ParserError.RuleDuplicate, rule };
      sr.set(FallbackKey, rule);
    }
  });

  // TODO: check map

  return {
    rulesMap,
  };
}

export const FSMGenerator = <S extends string = string>(
  states: Array<IState<S>>,
  rules: Array<ITranslateRule<S>>,
  scope: string,
) => {
  // store state info into a map
  const { initState, stateMap, endState } = analyzeStateList(states);
  // store rules into a map
  const { rulesMap } = analyzeRuleList(rules);

  const parse = (stream: string, lastState?: S): IParseResult<string, S> => {
    let currentState = lastState || initState;

    const result: IParseResult<string, S> = {
      parsedStream: '',
      lastingStream: stream,
      commands: [],
      lastState: currentState,
    };
    if (!stream || typeof stream !== 'string') {
      return result;
    }

    let waitString = '';
    let valueString = '';
    let parseCurrentState = currentState;
    let parseCurrentStateInfo =  stateMap.get(parseCurrentState);
    if (!parseCurrentStateInfo) throw { type: ParserError.ParsingNoStateInfo, state: parseCurrentStateInfo };

    if (parseCurrentStateInfo.end) {
      return result;
    }

    let parseNextState = currentState;

    for (let i = 0; i < stream.length; ++i) {
      if (parseCurrentStateInfo.end) {
        break;
      }
      const char = stream[i];

      const translateInfo = rulesMap.get(parseCurrentState);
      if (!translateInfo) throw { type: ParserError.ParsingNoRuleInfo, state: parseCurrentState };

      const rule = translateInfo.get(char) || translateInfo.get(FallbackKey);
      if (!rule) throw { type: ParserError.ParsingNoRuleInfoForInput, state: parseCurrentState, input: char };

      parseNextState = rule.to;
      const parseNextStateInfo = stateMap.get(parseNextState);
      if (!parseNextStateInfo) throw { type: ParserError.ParsingNoStateInfo, state: parseNextStateInfo };

      let hasLeaveAction = false;
      let hasEntryAction = false;

      if (parseCurrentStateInfo.leave_action && parseNextState !== parseCurrentState && waitString && valueString) {
        hasLeaveAction = true;
        // goto
        result.commands.push([scope, parseCurrentStateInfo.leave_action, valueString]);
        result.parsedStream += waitString;
        result.lastingStream = stream.substring(result.parsedStream.length)
        waitString = char;
        if (parseNextStateInfo.leave_action) {
          valueString = char;
        } else {
          valueString = '';
        }
        currentState = parseCurrentState;
      }

      if (parseNextStateInfo.entry_action) {
        hasEntryAction = true;
        result.commands.push([scope, parseNextStateInfo.entry_action, valueString]);
        result.parsedStream += waitString + char;
        result.lastingStream = stream.substring(result.parsedStream.length)
        waitString = '';
        valueString = ''
        currentState = parseNextState;
      }
      
      if (!hasEntryAction && !hasLeaveAction) {
        // goto next char
        waitString += char;
        if (parseNextStateInfo.leave_action) {
          valueString += char;
        } else {
          valueString = '';
        }
      }
      console.log('state', char, currentState, parseCurrentState, parseNextState);
      parseCurrentState = parseNextState;
      parseCurrentStateInfo = parseNextStateInfo;
    }

    console.log('===>', currentState, parseCurrentState, parseCurrentStateInfo, result);

    if (parseCurrentStateInfo.paused === StatePausedAction.backtrace) {
      
    } else if (parseCurrentStateInfo.paused === StatePausedAction.append && parseCurrentStateInfo.leave_action && waitString && valueString) {
      result.commands.push([scope, parseCurrentStateInfo.leave_action, valueString]);
      result.parsedStream += waitString;
      result.lastingStream = stream.substring(result.parsedStream.length)
      waitString = '';
      valueString = '';
      currentState = parseCurrentState;
    }

    result.lastState = currentState;
    return result;
  };

  return {
    parse,
    // reset,
  };
};

