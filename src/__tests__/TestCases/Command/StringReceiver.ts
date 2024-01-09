import { AbstractReceiver } from '../../../libs/Receivers/AbstractReceiver';

export class StringReceiver extends AbstractReceiver {
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
