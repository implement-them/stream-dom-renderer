import { describe, test, expect, beforeEach } from 'vitest'
import './init';
import { DomManager } from '../libs/Managers/DomManager';

import { appendTextCases } from './TestCases/DomManager/appendText';

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
});