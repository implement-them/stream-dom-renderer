import { AbstractStreamParser, IParseResult } from '../AbstractParser';
import { FSMGenerator } from '../FSMGenerator';
import { StandardRuleList, State, StateMap } from './standard.ll1';

/**
 * StandardParser
 * rules：* as special character
 *       *command**text***
 * state-machine:
 * @class StandardParser
 */
export class StandardParser extends AbstractStreamParser {

  static key = 'standard';

  private _parser = FSMGenerator<State>(
    StateMap,
    StandardRuleList,
    StandardParser.key,
  );

  public override getKey() {
    return StandardParser.key;
  }

  public override parse(stream: string): IParseResult<string> {

    return this._parser.parse(stream);
  }

  public override domCommandAdapter(scope: string, cmd: string, text: string): [string, { text: string }] {
    if (scope === StandardParser.key) {
      return ['dom.append_text', { text }];
    }
    return ['dom.idle', { text: '' }];
  }
}
