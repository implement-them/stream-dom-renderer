
export interface IParseResult<T extends [string, any] = [string, any]> {
  parsedStream: string;
  commands: T[];
}

export abstract class AbstractStreamParser {

  public abstract parse(stream: string): IParseResult;

  public abstract domCommandAdapter(...props: any[]): any;
}