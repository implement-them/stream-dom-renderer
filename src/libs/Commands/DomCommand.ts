import { AbstractCommand } from './Abstract';

export class DomCommand extends AbstractCommand {
  public async execute(command: string, payload?: any) {
    if (!payload.controller) {
      return;
    }
    switch (command) {
      case 'dom.append_child':
        break;
      case 'dom.append_text': 
        payload.controller.domManager.appendText(payload.text);
        break;
      default: break; 
    }
  }
}
