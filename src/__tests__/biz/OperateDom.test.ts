import '../init';
import { describe, test, expect, beforeEach } from 'vitest'
import { createStreamRenderer } from '../../libs';
import { DomCommand } from '../../libs/Commands/DomCommand';
import { appendTextCases } from '../TestCases/DomManager/appendText';

describe('DOM Command', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
  });
  test('[DOM Command]-Free',  async () => {
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

  test.each(appendTextCases)('[DOM Command]- dom.append_text $input', async ({ input, innerHTML, textContent }) => {
    const renderer = createStreamRenderer().use({
      commands: [
        new DomCommand(),
      ],
    });
    await renderer.execute('dom.append_text', { text: input });
    expect(renderer.domManager.currentNode.innerHTML).toBe(innerHTML);
    expect(renderer.domManager.currentNode.textContent).toBe(textContent);
  });
});
