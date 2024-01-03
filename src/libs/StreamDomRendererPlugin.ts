import { AbstractCommand } from './Commands/Abstract';
import { AbstractStreamParser } from './StreamParser/AbstractParser';

export interface IStreamDomRendererPlugin {
  commands?: AbstractCommand[];
  parsers?: AbstractStreamParser[];
}
