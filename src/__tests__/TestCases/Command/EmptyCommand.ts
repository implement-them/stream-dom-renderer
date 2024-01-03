import { AbstractCommand, ICommandPayload } from '../../../libs/Commands/AbstractCommand';

export class EmptyCommand extends AbstractCommand {
  public exe = false;
  execute(command: string, payload?: ICommandPayload) {
    this.exe = true;
  }
}
