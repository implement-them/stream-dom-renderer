import { IParseResult } from '../../../libs/StreamParser/AbstractParser';

export const StandardParserInput: Array<{
  input: string;
  result: IParseResult;
}> = [{
  input: '*',
  result: {
    parsedStream: '',
    commands: [],
  },
}, {
  input: '**test1*c',
  result: {
    parsedStream: '**test1',
    commands: [['unknown', 'test1']],
  },
}, {
  input: '*t**c***',
  result: {
    parsedStream: '*t**c',
    commands: [['t', 'c']],
  },
}, {
  input: '*t**c***dd',
  result: {
    parsedStream: '*t**c***dd',
    commands: [['t', 'c'], ['unknown', 'dd']],
  },
}];
