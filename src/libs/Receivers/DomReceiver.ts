import type { StreamDomRenderer } from '../StreamDomRenderer';
import { AbstractReceiver } from './AbstractReceiver';

export interface IDomCommands {
  'dom.append_child': {
    node: HTMLElement;
  };
  'dom.create_dom': {
    tag: string;
  },
  'dom.create_dom_finished': undefined,
  'dom.append_text': {
    text: string;
  };
  'dom.append_attribulte': {
    values: Array<[string, string, string?]>;
  },
  'dom.forward': undefined,
  'dom.backward': undefined,
  'dom.reset': undefined,
};

export type IDomCommandKey = keyof IDomCommands;

export type IDomCommandValue<T extends IDomCommandKey> = IDomCommands[T];

export type IDomCommand<T extends IDomCommandKey = IDomCommandKey> = [
  T,
  IDomCommandValue<T>,
];


export type IDomCommandPayload<T extends keyof IDomCommands> = IDomCommands[T] & {
  controller: StreamDomRenderer;
};

export class DomReceiver extends AbstractReceiver {
  public async execute<T extends keyof IDomCommands>(command: T, payload?: IDomCommandPayload<T>) {
    // console.log('dom command', command, payload);
    if (!payload || !payload.controller) {
      return;
    }
    switch (command) {
      case 'dom.append_child':
        payload.controller.domManager.appendChild((payload as IDomCommandPayload<'dom.append_child'>).node);
        break;
      case 'dom.create_dom':
        const tag = (payload as IDomCommandPayload<'dom.create_dom'>).tag;
        if (typeof tag === 'string' && !!tag) {
          const dom = document.createElement(tag);
          payload.controller.domManager.appendChild(dom);
          payload.controller.domManager.forward();
        }
        break;
      case 'dom.create_dom_finished':
        payload.controller.domManager.backward();
        break;
      case 'dom.append_text': 
        const text = (payload as IDomCommandPayload<'dom.append_text'>).text;
        if (typeof text === 'string' && !!text) {
          payload.controller.domManager.appendText(text);
        }
        break;
      case 'dom.append_attribulte':
        payload.controller.domManager.appendAttribultes((payload as IDomCommandPayload<'dom.append_attribulte'>).values);
        break;
      case 'dom.forward':
        payload.controller.domManager.forward();
        break;
      case 'dom.backward':
        payload.controller.domManager.backward();
        break;
      case 'dom.reset':
        payload.controller.domManager.clear();
        break;
      default: break; 
    }
  }
}
