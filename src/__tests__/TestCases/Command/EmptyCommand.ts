import { AbstractCommand, ICommandPayload } from '../../../libs/Commands/Abstract';

export class EmptyCommand extends AbstractCommand {
  public exe = false;
  execute(command: string, payload?: ICommandPayload) {
    this.exe = true;
  }
}
