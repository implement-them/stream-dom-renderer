
import { describe, test, expect, beforeEach } from 'vitest'
import { FSMGenerator } from '../../../libs/StreamParser/FSMGenerator';
import { StandardRuleList, State, StateMap } from '../../../libs/StreamParser/StarndardParser/standard.ll1';

describe('FSM Generator', () => {
  test('[FSM Generator] standard', () => {
    const parser = FSMGenerator<State>(
      StateMap,
      StandardRuleList,
      'test',
    );
    const r1 = parser.parse('*12')
    const r2 = parser.parse('*12**1', r1.lastState)
    const r3 = parser.parse('aaaaa', r2.lastState)
    const r4 = parser.parse('***3', r3.lastState)
    const r5 = parser.parse('***3**66', r4.lastState)
    console.log('==> 1', r1);
    console.log('==> 2', r2);
    console.log('==> 3', r3);
    console.log('==> 4', r4);
    console.log('==> 5', r5);
  });
});
