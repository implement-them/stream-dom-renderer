import './init';
import { describe, it, expect } from 'vitest'
import { StringCommand } from './TestCommand/StringCommand';
import { EmptyCommand } from './TestCommand/EmptyCommand';

describe('SingleCommand', () => {
  it('Write Stream',  async () => {
    const c1 = new EmptyCommand();
    const c2 = new StringCommand();
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
