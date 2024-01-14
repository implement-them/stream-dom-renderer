import { AbstractStreamParser, IParseResult } from '../AbstractParser';
import { IAction, StandardParserTransitionActionTable, StandardParserTransitionTable, State } from './standard.ll1';

/**
 * StandardParser
 * rules：* as special character
 *       *command**text
 * state-machine:
 * 0 start
 *  -*-> 1 waiting-for-command
 *    -*-> 2 waiting-for-payload
 *  -.-> text
 * @class StandardParser
 */
export class StandardParser extends AbstractStreamParser {

  static key = 'standard';

  public override getKey() {
    return StandardParser.key;
  }

  public override parse(stream: string): IParseResult<string> {
    const result: IParseResult<string> = {
      parsedStream: '',
      commands: [],
    };

    let state: State = State.init;
    let currentCommand: string | '' = '';
    let currentString: string = '';
    let waitString: string = '';
    for (let i = 0; i < stream.length; i++) {
      const char = stream[i];

      const nextTrans: {
        [key: string]: State;
      } = StandardParserTransitionTable[state];
      const nextActions = StandardParserTransitionActionTable[state];
      let nextState: State = state;
      let nextAction: IAction = 'wait';
      if (char === '*') {
        nextState = nextTrans['*'];
        nextAction = nextActions['*'];
      } else {
        nextState = nextTrans['.'];
        nextAction = nextActions['.'];
      }
      switch (nextAction) {
        case 'append-text': {
          currentString += char;
          waitString += char;
          break;
        }
        case 'append-command': {
          currentCommand += char;
          waitString += char;
          break;
        }
        case 'wait': {
          if (state === State.text && waitString) {
            result.commands.push([
              StandardParser.key,
              currentCommand || 'unknown',
              currentString,
            ]);
            result.parsedStream += waitString;
            waitString = '';
            currentCommand = '';
            currentString = '';
          }
          waitString += char;
          break;
        }
        default: {
          break;
        }
      }

      state = nextState;
    }

    if (state === State.text) {
      result.commands.push([
        StandardParser.key,
        currentCommand || 'unknown',
        currentString,
      ]);
      result.parsedStream += waitString;
      waitString = '';
      currentCommand = '';
      currentString = '';
    }

    return result;
  }

  public override domCommandAdapter(scope: string, cmd: string, text: string): [string, { text: string }] {
    if (scope === StandardParser.key) {
      return ['dom.append_text', { text }];
    }
    return ['dom.idle', { text: '' }];
  }
}
