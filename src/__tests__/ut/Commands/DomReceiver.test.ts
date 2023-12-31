import '../../init';
import { describe, test, expect, beforeEach } from 'vitest'
import { createStreamRenderer } from '../../utils/createStreamRenderer';
import { appendTextCases } from '../../TestCases/DomManager/appendText';
import { RichTextCommands, RichTextCommandsResult } from '../../TestCases/Command/DomCommandsList';
import { DomReceiver } from '../../../libs/Receivers/DomReceiver';

describe('DomReceiver', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
  });
  test('[DomReceiver]-Free',  async () => {
    const renderer = createStreamRenderer().use({
      reveivers: [
        new DomReceiver(),
      ],
    });

    renderer.execute('dom.sss', {});
    expect(renderer.domManager.rootNode.innerHTML).toBe('');

    await renderer.execute('dom.append_text', { text: 'hehe' });

    expect(renderer.domManager.currentNode.textContent).toBe('hehe');
    expect(renderer.domManager.currentNode).toEqual(document.body.firstChild);

    await renderer.execute('dom.append_text', { text: 'hehe1' });
    expect(renderer.domManager.currentNode.textContent).toBe('hehehehe1');
    expect(renderer.domManager.currentNode).toEqual(document.body.firstChild);
  });

  test.each(appendTextCases)('[DomReceiver]- dom.append_text $input', async ({ input, innerHTML, textContent }) => {
    const renderer = createStreamRenderer().use({
      reveivers: [
        new DomReceiver(),
      ],
    });
    await renderer.execute('dom.append_text', { text: input });
    expect(renderer.domManager.currentNode.innerHTML).toBe(innerHTML);
    expect(renderer.domManager.currentNode.textContent).toBe(textContent);
  });

  test('[DomReceiver]- dom.append_child', () => {
    const renderer = createStreamRenderer().use({
      reveivers: [
        new DomReceiver(),
      ],
    });
    renderer.execute('dom.append_child', { node: document.createElement('div') });
    expect(renderer.domManager.currentNode.innerHTML).toBe('<div></div>');
    renderer.execute('dom.append_child', { node: document.createElement('text') });
    expect(renderer.domManager.currentNode.innerHTML).toBe('<div></div><text></text>');
  });

  test('[DomReceiver]- dom.forward && dom.backword && dom.reset', () => {
    const renderer = createStreamRenderer().use({
      reveivers: [
        new DomReceiver(),
      ],
    });

    renderer.execute('dom.append_child', { node: document.createElement('div') });
    renderer.execute('dom.forward');
    expect(renderer.domManager.currentNode.parentElement).toBe(renderer.domManager.rootNode);
    renderer.execute('dom.backward');
    expect(renderer.domManager.currentNode).toBe(renderer.domManager.rootNode);
    expect(renderer.domManager.currentNode.children.length).toBe(1);
    renderer.execute('dom.reset');
    expect(renderer.domManager.currentNode.children.length).toBe(0);
  });

  test('[DomReceiver]- exec command list', async () => {
    const renderer = createStreamRenderer().use({
      reveivers: [
        new DomReceiver(),
      ],
    });
    await renderer.executeAll(RichTextCommands);
    expect(renderer.domManager.rootNode.innerHTML).toBe(RichTextCommandsResult);
  });

  test('[DomReceiver]- none input', async () => {
      const cmd = new DomReceiver();
      const renderer = createStreamRenderer().use({
        reveivers: [
          cmd,
        ],
      });
      cmd.execute('dom.append_text');
      cmd.execute('dom.create_dom');
      cmd.execute('dom.create_dom');
      cmd.execute('dom.append_attribulte');
      cmd.execute('dom.forward');
      cmd.execute('dom.backward');

      expect(renderer.domManager.rootNode.innerHTML).toBe('');
  });
});
