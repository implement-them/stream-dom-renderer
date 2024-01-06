# Stream Dom Renderer

Read stream input and render them to web page.

## Quick start:

### operate dom

````
import { StreamDomRenderer, IDomCommand } from '@liuyingyyx/stream-dom-renderer';

const streamRenderer = new StreamDomRenderer({
  dom: {
    parentNode: document.body,
  },
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

