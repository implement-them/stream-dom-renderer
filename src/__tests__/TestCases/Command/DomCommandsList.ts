import type { IDomCommand } from '../../../libs/Commands/DomCommand';
export const RichTextCommands: IDomCommand[] = [
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
  ['dom.create_dom_finished', undefined],
];

export const RichTextCommandsResult = '<h1 style="font-size: 16px;">header 1</h1><div>test 1<span style="color: red;font-size: 20px;font-weight: 800;">inline 1</span></div>';
