import { AbstractCommand } from '../../libs/Commands/Abstract';

export class StringCommand extends AbstractCommand {
  str = '';
  execute(command: string, payload?: any) {
    switch (command) {
      case 'append-string': 
        if (payload.string && typeof payload.string ==='string') {
          this.str += payload.string;
        }
        break;
      default: break;
    }
  }
}
