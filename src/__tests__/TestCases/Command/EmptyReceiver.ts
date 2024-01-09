import { AbstractReceiver, ICommandPayload } from '../../../libs/Receivers/AbstractReceiver';

export class EmptyReceiver extends AbstractReceiver {
  public exe = false;
  execute(command: string, payload?: ICommandPayload) {
    this.exe = true;
  }
}
