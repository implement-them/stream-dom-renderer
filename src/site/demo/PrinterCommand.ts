import { Commands, IDomCommandPayload, IDomCommands } from 'stream-dom-renderer';
import { sleep } from '../utils/sleep';

export class PrinterCommand extends Commands.DomCommand {
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
          await sleep(200);
        }
      }
    }
  }
}
