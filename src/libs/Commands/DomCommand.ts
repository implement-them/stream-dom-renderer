import type { StreamDomRenderer } from '../StreamDomRenderer';
import { AbstractCommand } from './Abstract';

export interface IDomCommands {
  'dom.append_child': {
    node: HTMLElement;
  };
  'dom.append_text': {
    text: string;
  };
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

export class DomCommand extends AbstractCommand {
  public async execute<T extends keyof IDomCommands>(command: T, payload?: IDomCommandPayload<T>) {
    console.log('dom command', command, payload);
    if (!payload || !payload.controller) {
      return;
    }
    switch (command) {
      case 'dom.append_child':
        payload.controller.domManager.appendChild((payload as IDomCommandPayload<'dom.append_child'>).node);
        break;
      case 'dom.append_text': 
        payload.controller.domManager.appendText((payload as IDomCommandPayload<'dom.append_text'>).text);
        break;
      default: break; 
    }
  }
}
