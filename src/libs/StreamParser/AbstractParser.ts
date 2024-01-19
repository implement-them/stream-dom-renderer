
export type IParseResultCommand<T extends any = any> = [string, string, T];

export interface IParseResult<T extends any = any, S extends string = string> {
  parsedStream: string;
  lastingStream: string;
  commands: IParseResultCommand<T>[];
  lastState?: S;
}

export abstract class AbstractStreamParser {
  public abstract getKey(): string;

  public abstract parse(stream: string): IParseResult;

  public abstract domCommandAdapter(...props: any[]): any;
}