import { IDomCommand } from 'stream-dom-renderer';
export const RichTextCommands: IDomCommand[] = [
  ['dom.reset', undefined],
  ['dom.create_dom', { tag: 'h1' }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 30px;font-weight: 800;']],
  }],
  ['dom.append_text', { text: 'header 1' }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom', { tag: 'div' }],
  ['dom.append_text', { text: 'test 1 ' }],
  ['dom.create_dom', { tag: 'span' }],
  ['dom.append_attribulte', {
    values: [['style', 'color: red;']],
  }],
  ['dom.append_attribulte', {
    values: [['style', 'font-size: 20px;font-weight: 500;']],
  }],
  ['dom.append_text', { text: 'inline 1' }],
  ['dom.create_dom_finished', undefined],
  ['dom.create_dom_finished', undefined],
];
