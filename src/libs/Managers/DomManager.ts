import { IStreamDomRendererOptions } from '../StreamDomRendererOptions';

export class DomManager {
  private _parentNode: HTMLElement;
  private _rootNode: HTMLElement;

  private _currentNode: HTMLElement;

  public get currentNode() {
    return this._currentNode;
  }

  constructor(options?: IStreamDomRendererOptions['dom']) {
    this._parentNode = options && options.parentNode ? options.parentNode : document.body;
    this._rootNode = document.createElement('div');
    this._parentNode.appendChild(this._rootNode);
    this._currentNode = this._rootNode;
  }

  public setParentNode(node: HTMLElement) {
    this._parentNode = node;
    this._parentNode.appendChild(this._rootNode);
    return this;
  }

  public appendAttribultes() {}

  public appendChild() {}

  public appendText(text: string) {
    this._currentNode.innerHTML += text;
    return this;
  }
}
