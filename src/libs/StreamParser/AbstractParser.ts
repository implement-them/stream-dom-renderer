
export type IParseResultCommand<T extends any = any> = [string, string, T];

export interface IParseResult<T extends any = any> {
  parsedStream: string;
  commands: IParseResultCommand[];
  nextState?: string;
}

export abstract class AbstractStreamParser {
  public abstract getKey(): string;

  public abstract parse(stream: string): IParseResult;

  public abstract domCommandAdapter(...props: any[]): any;
}