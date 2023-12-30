import { IStreamDomRendererOptions } from '../StreamDomRendererOptions';

export class DomManager {
  /**
   * parentNode：parent node of root
   */
  private _parentNode: HTMLElement;
  /**
   * rootNode: root node of internal dom tree
   */
  private _rootNode!: HTMLElement;

  /**
   * currentNode: operators will be executed on this node
   */
  private _currentNode!: HTMLElement;

  public get currentNode() {
    return this._currentNode;
  }

  /**
   * @name DomManager
   * @param options
   */
  constructor(options?: IStreamDomRendererOptions['dom']) {
    this._parentNode = options && options.parentNode ? options.parentNode : document.body;
    this.init();
  }

  private init() {
    this._rootNode = document.createElement('div');
    this._parentNode.appendChild(this._rootNode);
    this._currentNode = this._rootNode;
  }

  /**
   * @name setParentNode
   * @param newParentNode new parent node
   * @returns {this}
   */
  public setParentNode(newParentNode: HTMLElement) {
    this._parentNode = newParentNode;
    this._parentNode.appendChild(this._rootNode);
    return this;
  }

  public clear() {
    this._parentNode.removeChild(this._rootNode);
    this.init();
    return this;
  }

  public appendAttribultes() {
    return this;
  }

  public appendChild(node: HTMLElement) {
    this._currentNode.appendChild(node);
    return this;
  }

  /**
   * @name appendText
   * @param text 
   * @returns 
   */
  public appendText(text: string) {
    this._currentNode.innerHTML += text;
    return this;
  }

  public forward() {
    return this;
  }

  public backward() {
    return this;
  }
}
