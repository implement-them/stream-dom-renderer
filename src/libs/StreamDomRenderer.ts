import { IStreamDomRendererOptions } from './StreamDomRendererOptions';
import { StreamManager } from './Managers/StreamManager';
import { DomManager } from './Managers/DomManager';
import { ReceiverManager } from './Managers/ReceiverManager';
import { IStreamDomRendererPlugin } from './StreamDomRendererPlugin';
import { ParserManager } from './Managers/ParserManager';

export class StreamDomRenderer {

  public streamManager    : StreamManager;
  public domManager       : DomManager;
  private _receiverManager : ReceiverManager;
  private _parserManager  : ParserManager;

  private _plugins: IStreamDomRendererPlugin[] = [];

  constructor(options?: IStreamDomRendererOptions) {
    this.streamManager = new StreamManager();
    this.domManager = options?.dom?.renderer ? new options.dom.renderer(options?.dom) : new DomManager(options?.dom);
    this._receiverManager = new ReceiverManager(this);
    this._parserManager = new ParserManager(this);
  }

  public setParentNode(node: HTMLElement) {
    this.domManager.setParentNode(node);
    return this;
  }

  public writeStream(stream: string) {
    this.streamManager.writeStream(stream);
    const result = this._parserManager.parse(this.streamManager.parsingStream);
    if (result) {
      result.commands.forEach((item) => {
        const cmd = this._parserManager.domCommandAdapter(item);
        this.execute(cmd[0], cmd[1]);
      });
      this.streamManager.appendParsed(result.parsedStream);
    }

    return this;
  }

  public use(plugin: IStreamDomRendererPlugin) {
    this._plugins.push(plugin);
    if (plugin.reveivers && plugin.reveivers.length) {
      this._receiverManager.use(plugin.reveivers);
    }
    if (plugin.parsers) {
      this._parserManager.use(plugin.parsers);
    }
    return this;
  }

  public async execute(command: string, payload?: { [key: string]: any; }) {
    await this._receiverManager.execute(command, payload);
    return this;
  }

  public async executeAll(commands: Array<[string, any]>) {
    for (const command of commands) {
      await this.execute(command[0], command[1]);
    }
    return this;
  }
}
