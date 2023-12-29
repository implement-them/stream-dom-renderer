
export interface IParseResult {
  parsedStream: string;
  commands: any[];
}

export abstract class AbstractStreamParser {

  public abstract parse(stream: string): any;
}