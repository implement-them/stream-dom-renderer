export enum State {
  init = 'init',
  text = 'text',
  star1 = 'star1',
  star2 = 'star2',
  command = 'command',
  // error = 'error',
  starm = 'starm',
}

export const StandardParserTransitionTable: {
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

export type IAction = 'append-text' | 'wait' | 'append-command';

export const StandardParserTransitionActionTable: {
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