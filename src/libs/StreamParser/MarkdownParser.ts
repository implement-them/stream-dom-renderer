import { AbstractStreamParser } from './AbstractParser';

export class MarkdownParser extends AbstractStreamParser {

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
