import { AbstractReceiver } from './Receivers/AbstractReceiver';
import { AbstractStreamParser } from './StreamParser/AbstractParser';

/**
 * Plugins of StreamDomRenderer
 * @example
new StreamDomRenderer().use({
  reveivers: [new DomReceiver()],
  parsers: [new StandardParser()],
});
 * @example
new StreamDomRenderer().use({
  reveivers: [new DomReceiver()],
}).use({
  parsers: [new StandardParser()],
});
 */
export interface IStreamDomRendererPlugin {
  reveivers?: AbstractReceiver[];
  parsers?: AbstractStreamParser[];
}
