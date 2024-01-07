import { describe, test, expect, beforeEach } from 'vitest'
import '../../init';
import { DomManager } from '../../../libs/Managers/DomManager';

import { appendTextCases } from '../../TestCases/DomManager/appendText';

describe('DOM Manager Unit Test', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
  });
  test('[DOM Manager]-init', async () => {
    const domManager = new DomManager({
      parentNode: document.body,
    });

    expect(document.body.innerHTML).toBe('<div></div>');
    expect(document.body.firstChild).toEqual(domManager.currentNode);

  });

  test.each(appendTextCases)('[DOM Manager]-appendText $input', async ({ input, innerHTML, textContent }) => {
    const domManager = new DomManager({
      parentNode: document.body,
    });
    domManager.appendText(input);
    expect(domManager.currentNode.innerHTML).toBe(innerHTML);
    expect(domManager.currentNode.textContent).toBe(textContent);
  });

  test('[DOM Manager]-appendChild', () => {
    const domManager = new DomManager({
      parentNode: document.body,
    });
    expect(domManager.currentNode.innerHTML).toBe('');
    domManager.appendChild(document.createElement('div'));
    expect(domManager.currentNode.innerHTML).toBe('<div></div>');

    domManager.appendChild(document.createElement('text'));
    expect(domManager.currentNode.innerHTML).toBe('<div></div><text></text>');
  })

  test('[DOM Manager]-forward & backward', () => {
    const domManager = new DomManager({
      parentNode: document.body,
    });

    domManager.appendChild(document.createElement('div'))
      .appendChild(document.createElement('div'))
      .forward();
    expect(domManager.currentNode).toBe(domManager.rootNode.lastChild);
    expect(domManager.currentNode).not.toBe(domManager.rootNode.firstChild);

    domManager.forward();
    expect(domManager.currentNode).toBe(domManager.rootNode.lastChild);

    domManager.backward();
    expect(domManager.currentNode).toBe(domManager.rootNode);

    domManager.backward();
    expect(domManager.currentNode).toBe(domManager.rootNode);
  });
});