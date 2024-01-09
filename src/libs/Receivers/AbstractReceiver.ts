export interface ICommandPayload {
  [key: string]: any;
}

export interface IReceiver {
  /**
   * 
   * @param controller 
   * @returns {true} execute next command
   * @returns {false} stop execute next command
   */
  execute: (command: string, payload?: ICommandPayload) => void;
}

/**
 * @description abstract class of command
 */
export abstract class AbstractReceiver implements IReceiver {
  async executeFramework(command: string, payload?: ICommandPayload) {
    await this.execute(command, payload);
    // iterator.next();
  }

  abstract execute(command: string, payload?: ICommandPayload): void;
}
