import '../../init';
import { describe, it, expect } from 'vitest'
import { EmptyReceiver } from '../../TestCases/Command/EmptyReceiver';
import { StringReceiver } from '../../TestCases/Command/StringReceiver';

describe('Single Receiver', () => {
  it('Write Stream',  async () => {
    const c1 = new EmptyReceiver();
    const c2 = new StringReceiver();
    const cmdList = [c1, c2];
    
    cmdList.forEach(cmd => {
      cmd.execute(
        'append-string',
        {
          string: 'writing',
        },
      );
    });

    cmdList.forEach(cmd => {
      cmd.execute(
        'append-string-1',
        {
          string: 'skip',
        },
      );
    });

    expect(c1.exe).toBe(true);
    expect(c2.str).toBe('writing');
  });
});
