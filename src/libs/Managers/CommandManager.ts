import { AbstractCommand } from '../Commands/AbstractCommand';
import { StreamDomRenderer } from '../StreamDomRenderer';

export class CommandManger {
  private _controller? : StreamDomRenderer;
  private _commands : AbstractCommand[] = [];

  constructor(controller: StreamDomRenderer) {
    this._controller = controller;
  }

  public use(commands: AbstractCommand[]) {
    this._commands.push(...commands);
    return this;
  }

  public async execute(command: string, payload?: any) {
    const _payload = Object.assign({}, payload, {
      controller: this._controller,
    });
    const iterator = this._commands.entries();
    let value = iterator.next();
    while (value.done!== true) {
      await value.value[1].executeFramework(command, _payload);
      value = iterator.next();
    }
  }
}
