import { AbstractStreamParser } from '../AbstractParser';

export class MarkdownParser extends AbstractStreamParser {
  static key = 'markdown';

  public override getKey() {
    return MarkdownParser.key;
  }

  public override parse(): any {
  }

  public domCommandAdapter(...props: any[]) {
      
    return [
      'text',
      {
        text: props[0]
      }
    ];
  }
}
