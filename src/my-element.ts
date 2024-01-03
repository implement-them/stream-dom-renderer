import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { StreamDomRenderer } from './libs/StreamDomRenderer';
import { DomCommand } from './libs/Commands/DomCommand';
import { StandardParser } from './libs/StreamParser/StandardParser';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @query('#renderParent')
  _dom: any;

  @property({ type: Object })
  streamRenderer: StreamDomRenderer | null = null;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    console.log('first update get dom', this._dom);
    if (this._dom) {
      this.streamRenderer = new StreamDomRenderer({
        dom: {
          parentNode: this._dom,
        },
      });
      this.streamRenderer.use({
        commands: [new DomCommand()],
        parsers: [new StandardParser()],
      });
      this.streamRenderer.writeStream('**sss**');
      (window as any).controller = this.streamRenderer;
    }
  }

  render() {
    return html`
      <div>Render</div>
      <div id="renderParent"></div>
    `
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
