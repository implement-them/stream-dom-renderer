import { AbstractCommand } from './Commands/AbstractCommand';
import { AbstractStreamParser } from './StreamParser/AbstractParser';

/**
 * Plugins of StreamDomRenderer
 * @example
new StreamDomRenderer().use({
  commands: [new DomCommand()],
  parsers: [new StandardParser()],
});
 * @example
new StreamDomRenderer().use({
  commands: [new DomCommand()],
}).use({
  parsers: [new StandardParser()],
});
 */
export interface IStreamDomRendererPlugin {
  commands?: AbstractCommand[];
  parsers?: AbstractStreamParser[];
}
