import { DomManager } from './Managers/DomManager';

/**
 * init configs of StreamDomRenderer
 */
export interface IStreamDomRendererOptions {
  /**
   * Options for the DomManager
   */
  dom?: {
    /** HTML Element to append to */
    parentNode?: HTMLElement;
    /** replace default dom manager to render element */
    renderer?: typeof DomManager;
  };
}
