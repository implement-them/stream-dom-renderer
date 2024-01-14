import type { StreamDomRenderer } from '../StreamDomRenderer';
import { AbstractStreamParser, IParseResultCommand } from '../StreamParser/AbstractParser';

export class ParserManager {
  private _controller? : StreamDomRenderer;
  // parsers should not be used one by one
  // in this version, only the first parser will be used
  // parsers will be managed later
  private _parsers_l: AbstractStreamParser[] = [];

  // private _parserMap: Map<string, AbstractStreamParser> = new Map();

  constructor(controller: StreamDomRenderer) {
    this._controller = controller;
  }
  
  public use(parsers: AbstractStreamParser[]) {
    this._parsers_l.push(...parsers);
    // parsers.forEach((p) => {
    //   this._parserMap.set(p.getKey(), p);
    // });
    return this;
  }

  public parse(s: string) {
    if (this._parsers_l.length > 0) {
      return this._parsers_l[0].parse(s);
    }
    return {
      parsedStream: '',
      commands: [],
    };
  }

  public domCommandAdapter(origin: IParseResultCommand<any>) {
    if (this._parsers_l.length > 0) {
      return this._parsers_l[0].domCommandAdapter(origin[0], origin[1], origin[2]);
    }
    return origin;
  }

}
