import { IStreamDomRendererOptions } from './StreamDomRendererOptions';
import { StreamManager } from './Managers/StreamManager';
import { DomManager } from './Managers/DomManager';
import { CommandManger } from './Managers/CommandManager';
import { IStreamDomRendererPlugin } from './StreamDomRendererPlugin';

export class StreamDomRenderer {

  public streamManager : StreamManager;
  public domManager    : DomManager;
  private _commandManager: CommandManger;

  private _plugins: IStreamDomRendererPlugin[] = [];


  constructor(options?: IStreamDomRendererOptions) {
    this.streamManager = new StreamManager();
    this.domManager    = new DomManager(options?.dom);
    this._commandManager = new CommandManger(this);
  }

  public setParentNode(node: HTMLElement) {
    this.domManager.setParentNode(node);
    return this;
  }

  public writeStream(stream: string) {
    this.streamManager.writeStream(stream);

    // ! TODO delete them
    // this._domManager.currentNode.innerHTML += stream;
    this.domManager.currentNode.append(stream);
    this.streamManager.appendParsed(stream);
    return this;
  }

  public use(plugin: IStreamDomRendererPlugin) {
    this._plugins.push(plugin);
    if (plugin.commands && plugin.commands.length) {
      this._commandManager.use(plugin.commands);
    }
    return this;
  }

  public async execute(command: string, payload?: { [key: string]: any; }) {
    await this._commandManager.execute(command, payload);
    return this;
  }
}
