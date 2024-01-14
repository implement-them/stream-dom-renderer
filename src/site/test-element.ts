import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { parser } from './demo/test';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('test-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @query('#testRoot')
  _dom: any;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    debugger;
    const r = parser.processSync('# hello world');
    console.log(r);
  }

  render() {
    return html`
      <div>Test</div>
      <div id="testRoot"></div>
    `
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'test-element': MyElement
  }
}
