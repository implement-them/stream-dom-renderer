import { AbstractStreamParser, IParseResult } from './AbstractParser';

enum State {
  init = 'init',
  text = 'text',
  star1 = 'star1',
  star2 = 'star2',
  command = 'command',
  // error = 'error',
  starm = 'starm',
}

const StandardParserTransitionTable: {
  [key in State]: {
    '*': State;
    '.': State;
  }
} = {
  [State.init]: {
    '*': State.star1,
    '.': State.text,
  },
  [State.text]: {
    '*': State.star1,
    '.': State.text,
  },
  [State.star1]: {
    '*': State.star2,
    '.': State.command,
  },
  [State.star2]: {
    '*': State.starm,
    '.': State.text,
  },
  [State.command]: {
    '*': State.star1,
    '.': State.command,
  },
  [State.starm]: {
    '*': State.starm,
    '.': State.text,
  },
};

type IAction = 'append-text' | 'wait' | 'append-command';

const StandardParserTransitionActionTable: {
  [key in State]: {
    '*': IAction;
    '.': IAction;
  }
} = {
  [State.init]: {
    '*': 'wait',
    '.': 'append-text',
  },
  [State.text]: {
    '*': 'wait',
    '.': 'append-text',
  },
  [State.star1]: {
    '*': 'wait',
    '.': 'append-command',
  },
  [State.star2]: {
    '*': 'wait',
    '.': 'append-text',
  },
  [State.command]: {
    '*': 'wait',
    '.': 'append-command',
  },
  [State.starm]: {
    '*': 'wait',
    '.': 'append-text',
  },
};

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
  public override parse(stream: string): IParseResult<[string, string]> {
    const result: IParseResult<[string, string]> = {
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

  public override domCommandAdapter(cmd: string, text: string): [string, { text: string }] {
    return ['dom.append_text', { text }];
  }
}
