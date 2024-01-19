export enum StatePausedAction {
  append = 'append',
  backtrace = 'backtracetate',
}

export interface IState<Key extends string = string, Action extends string = string> {
  key: Key;
  // is initial state
  init?: boolean;
  // is end state
  end?: boolean;
  // action when stream paused in this state
  paused: StatePausedAction;
  // action when leave this state
  leave_action?: Action;
  // action when entry this state
  entry_action?: Action;
}

export interface ITranslateRule<Key extends string = string> {
  /** from state */
  from: Key;
  /** to state */
  to: Key;
  /** input, should be a character */
  input?: string;
  /** is default rule */
  fallback?: boolean;
}
