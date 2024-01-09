import { AbstractReceiver } from '../Receivers/AbstractReceiver';
import { StreamDomRenderer } from '../StreamDomRenderer';

export class ReceiverManager {
  private _controller? : StreamDomRenderer;
  private _receivers : AbstractReceiver[] = [];

  constructor(controller: StreamDomRenderer) {
    this._controller = controller;
  }

  public use(receivers: AbstractReceiver[]) {
    this._receivers.push(...receivers);
    return this;
  }

  public async execute(command: string, payload?: any) {
    const _payload = Object.assign({}, payload, {
      controller: this._controller,
    });
    const iterator = this._receivers.entries();
    let value = iterator.next();
    while (value.done!== true) {
      await value.value[1].executeFramework(command, _payload);
      value = iterator.next();
    }
  }
}
