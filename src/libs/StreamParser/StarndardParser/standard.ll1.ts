import { IState, ITranslateRule, StatePausedAction } from '../IState';

export enum State {
  init = 'init',
  end = 'end',
  text = 'text',
  star1 = 'star1',
  star2 = 'star2',
  command = 'command',
};

export const StateMap: Array<IState<State>> = [
  { key: State.init, paused: StatePausedAction.backtrace, init: true },
  { key: State.text, paused: StatePausedAction.append, leave_action: 'append-text' },
  { key: State.star1, paused: StatePausedAction.backtrace },
  { key: State.star2, paused: StatePausedAction.backtrace },
  { key: State.end, paused: StatePausedAction.append, entry_action: 'end', end: true },
  { key: State.command, paused: StatePausedAction.backtrace, leave_action: 'append-command' },
];

export const StandardRuleList: Array<ITranslateRule<State>> = [
  { from: State.init, to: State.star1, input: '*' },
  { from: State.init, to: State.text, fallback: true },
  { from: State.text, to: State.star1, input: '*' },
  { from: State.text, to: State.text, fallback: true },
  { from: State.star1, to: State.star2, input: '*' },
  { from: State.star1, to: State.command, fallback: true },
  { from: State.star2, to: State.end, input: '*' },
  { from: State.star2, to: State.text, fallback: true },
  { from: State.command, to: State.star1, input: '*' },
  { from: State.command, to: State.command, fallback: true },
  { from: State.end, to: State.end, fallback: true, },
];
