import { IParseResult } from '../../../libs/StreamParser/AbstractParser';

export const StandardParserInput: Array<{
  input: string;
  result: IParseResult;
}> = [{
  input: '*',
  result: {
    parsedStream: '',
    lastingStream: '*',
    commands: [],
    lastState: 'init',
  },
}, {
  input: '**',
  result: {
    parsedStream: '',
    lastingStream: '**',
    commands: [],
    lastState: 'init',
  },
}, {
  input: '***',
  result: {
    parsedStream: '***',
    lastingStream: '',
    commands: [['standard', 'end', '']],
    lastState: 'end',
  },
}, {
  input: '**s',
  result: {
    parsedStream: '**s',
    lastingStream: '',
    commands: [['standard', 'append-text', 's']],
    lastState: 'text',
  },
}, {
  input: '*s*',
  result: {
    parsedStream: '*s',
    lastingStream: '*',
    commands: [['standard', 'append-command', 's']],
    lastState: 'command',
  },
}, {
  input: '*s*4',
  result: {
    parsedStream: '*s',
    lastingStream: '*4',
    commands: [['standard', 'append-command', 's']],
    lastState: 'command',
  },
}, {
  input: '*s*4***',
  result: {
    parsedStream: '*s*4***',
    lastingStream: '',
    commands: [['standard', 'append-command', 's'], ['standard', 'append-command', '4'], ['standard', 'end', '']],
    lastState: 'end',
  },
}, {
  input: '*s*4***222',
  result: {
    parsedStream: '*s*4***',
    lastingStream: '222',
    commands: [['standard', 'append-command', 's'], ['standard', 'append-command', '4'], ['standard', 'end', '']],
    lastState: 'end',
  },
}];
