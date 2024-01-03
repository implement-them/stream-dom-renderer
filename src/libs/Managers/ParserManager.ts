import type { StreamDomRenderer } from '../StreamDomRenderer';
import { AbstractStreamParser } from '../StreamParser/AbstractParser';

export class ParserManager {
  private _controller? : StreamDomRenderer;
  // parsers should not be used one by one
  // in this version, only the first parser will be used
  // parsers will be managed later
  private _parsers: AbstractStreamParser[] = [];

  constructor(controller: StreamDomRenderer) {
    this._controller = controller;
  }
  
  public use(parsers: AbstractStreamParser[]) {
    this._parsers.push(...parsers);
    return this;
  }

  public parse(s: string) {
    if (this._parsers.length > 0) {
      return this._parsers[0].parse(s);
    }
    return {
      parsedStream: '',
      commands: [],
    };
  }

  public domCommandAdapter(origin: [string, any]) {
    if (this._parsers.length > 0) {
      return this._parsers[0].domCommandAdapter(origin[0], origin[1]);
    }
    return origin;
  }

}
