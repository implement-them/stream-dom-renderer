import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { Receivers, StreamDomRenderer } from 'stream-dom-renderer';
import { RichTextCommands } from './demo/execDemo/RichTextCommands';

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
    if (this._dom) {
      this.streamRenderer = new StreamDomRenderer({
        dom: {
          parentNode: this._dom,
        },
      });
      this.streamRenderer.use({
        reveivers: [new Receivers.DomReceiver()],
      });
      this.streamRenderer.executeAll(RichTextCommands);
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
