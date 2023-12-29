
export class StreamManager {
  /** All of the stream to render */
  private _stream: string = '';

  private _parsedStream: string = '';
  private _parsingStream: string = '';

  public get stream() {
    return this._stream;
  }

  public get parsedStream() {
    return this._parsedStream;
  }

  public get parsingStream() {
    return this._parsingStream;
  }

  public writeStream (stream: string ) {
    this._stream += stream;
    this._parsingStream += stream;
    return this;
  }

  public appendParsed(s: string) {
    if (this._parsingStream.startsWith(s)) {
      this._parsedStream += s;
      this._parsingStream = this._parsingStream.slice(s.length);
      return this;
    } else {
      throw `Error: ${s} was not part of the stream`;
    }
  }
}
