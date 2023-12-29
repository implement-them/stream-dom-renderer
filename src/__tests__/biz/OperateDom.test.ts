import '../init';
import { describe, test, expect } from 'vitest'
import { createStreamRenderer } from '../../libs';
import { DomCommand } from '../../libs/Commands/DomCommand';

describe('DOM Command 操作节点', () => {
  test('写入字符串',  async () => {
    const renderer = createStreamRenderer().use({
      commands: [
        new DomCommand(),
      ],
    });

    await renderer.execute('dom.append_text', { text: 'hehe' });

    expect(renderer.domManager.currentNode.textContent).toBe('hehe');
    expect(renderer.domManager.currentNode).toEqual(document.body.firstChild);

    await renderer.execute('dom.append_text', { text: 'hehe1' });
    expect(renderer.domManager.currentNode.textContent).toBe('hehehehe1');
    expect(renderer.domManager.currentNode).toEqual(document.body.firstChild);
  });
});

