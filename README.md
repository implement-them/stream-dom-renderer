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

<style>
  input[type="checkbox"]:disabled {
    /* 样式设置 */
    -webkit-appearance: none;
    transform: translateY(4px);
    border: 1px solid #ccc; /* 边框 */
    width: 1rem; /* 宽度 */
    height: 1rem; /* 高度 */
    border-radius: 6px; /* 圆角 */
    outline: none;
    background-color: white;
    /* color: green; */
  }
  input[type="checkbox"]:disabled:checked {
    /* 样式设置 */
    -webkit-appearance: none;
    transform: translateY(4px);
    border: 1px solid #ccc; /* 边框 */
    width: 1rem; /* 宽度 */
    height: 1rem; /* 高度 */
    border-radius: 6px; /* 圆角 */
    outline: none;
    background-color: #121212;
    /* color: green; */
  }
</style>

<input type="checkbox" disabled checked> execute basic dom operators

<input type="checkbox" disabled> support dom event

<input type="checkbox" disabled checked> support 'internal' stream input

<input type="checkbox" disabled> support official markdown stream as input (exclude code block)

<input type="checkbox" disabled> support a third party syntax tree rule

<input type="checkbox" disabled> support one source code highlighting

<input type="checkbox" disabled> support custom generated rules

