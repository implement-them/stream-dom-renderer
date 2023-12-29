export interface ICommandPayload {
  [key: string]: any;
}

export interface ICommand {
  /**
   * 
   * @param controller 
   * @returns {true} execute next command
   * @returns {false} stop execute next command
   */
  execute: (command: string, payload?: ICommandPayload) => void;
}

export abstract class AbstractCommand implements ICommand {
  async executeFramework(command: string, payload?: ICommandPayload) {
    await this.execute(command, payload);
    // iterator.next();
  }

  abstract execute(command: string, payload?: ICommandPayload): void;
}
