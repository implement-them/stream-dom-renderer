# Stream Dom Renderer

Read stream input and render them to web page.

## Quick start:

### operate dom

````
import { StreamDomRenderer, IDomCommand, Receivers } from 'stream-dom-renderer';

const streamRenderer = new StreamDomRenderer({
  dom: {
    parentNode: document.body,
  },
});

streamRenderer.use({
  reveivers: [new Receivers.DomReceiver()],
});

streamRenderer.executeAll([
  ['dom.reset', undefined],
  ['dom.create_dom', { tag: 'h1' }],
  ['dom.append_text', { text: 'header 1' }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 16px;']],
  }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom', { tag: 'div' }],
  ['dom.append_text', { text: 'test 1' }],
  ['dom.create_dom', { tag: 'span' }],
  ['dom.append_text', { text: 'inline 1' }],
  ['dom.append_attribulte', {
    values: [['style', 'color: red;']],
  }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 20px;font-weight: 800;']],
  }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom_finished', undefined]]);
````

### Mock Stream Print
````
// Customize receiver 
import { Receivers, IDomCommandPayload, IDomCommands } from 'stream-dom-renderer';
import { sleep } from '../utils/sleep';

export class PrinterReciever extends Receivers.DomReceiver {
  public override async execute<T extends keyof IDomCommands>(command: T, payload?: IDomCommandPayload<T>) {
    if (command !== 'dom.append_text') {
      super.execute(command, payload);
      return;
    } else {
      if (!payload || !payload.controller) {
        return;
      }
      const text = (payload as IDomCommandPayload<'dom.append_text'>).text;
      if (typeof text === 'string' && !!text) {
        for (let i = 0; i < text.length ; i++) {
          await payload.controller.domManager.appendText(text[i]);
          await sleep(1000);
        }
      }
    }
  }
}

// App
import { StreamDomRenderer, IDomCommand } from 'stream-dom-renderer';

const streamRenderer = new StreamDomRenderer({
  dom: {
    parentNode: document.body,
  },
});

streamRenderer.use({
  reveivers: [new PrinterReciever()],
});

streamRenderer.executeAll([
  ['dom.reset', undefined],
  ['dom.create_dom', { tag: 'h1' }],
  ['dom.append_text', { text: 'header 1' }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 16px;']],
  }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom', { tag: 'div' }],
  ['dom.append_text', { text: 'test 1' }],
  ['dom.create_dom', { tag: 'span' }],
  ['dom.append_text', { text: 'inline 1' }],
  ['dom.append_attribulte', {
    values: [['style', 'color: red;']],
  }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 20px;font-weight: 800;']],
  }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom_finished', undefined]]);
````

## Change log:
- 2024-01-03: support basic dom operators

## Milestones & TODO list:

- ☑ execute basic dom operators
- ☒ support dom event
- ☑ support 'internal' stream input
- ☒ support official markdown stream as input (exclude code block)
- ☒ support a third party syntax tree rule
- ☒ support one source code highlighting
- ☒ support custom generated rules

