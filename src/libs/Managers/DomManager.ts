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

  public get rootNode() {
    return this._rootNode;
  }

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

  /**
   * @name clear
   * @description init dom renderer
   * @returns {this}
   */
  public clear() {
    this._parentNode.removeChild(this._rootNode);
    this.init();
    return this;
  }

  /**
   * @name setAttribultes
   * @description set attributes to current node, old value will be replaced
   * @param props [attributeName, attributeValue]
   * @returns {this}
   */
  public setAttribultes(props: Array<[string, string]>) {
    props.forEach(([key, value]) => {
      this._currentNode.setAttribute(key, value);
    });
    return this;
  }

  /**
   *  @name appendAttribultes
   * @description append attributes to current node, old value will be part of the new value
   * @param props [attributeName, attributeValue, split]
   * @returns {this}
   */
  public appendAttribultes(props: Array<[string, string, string?]>) {
    props.forEach(([key, value, split = '']) => {
      const oldValue = this._currentNode.getAttribute(key);
      if (typeof oldValue === 'string' && !!oldValue) {
        this._currentNode.setAttribute(key, `${oldValue}${split}${value}`);
      } else {
        this._currentNode.setAttribute(key, value);
      }
    });
    return this;
  }

  public appendChild(node: HTMLElement) {
    this._currentNode.appendChild(node);
    return this;
  }

  /**
   * @name appendText
   * @param text append to dom width textContent, which is more securiry than innerHTML
   * @returns 
   */
  public appendText(text: string) {
    this._currentNode.textContent += text;
    return this;
  }

  /**
   * @name forward move currentNode to "next" node (last child of currentNode)
   * @returns {this}
   */
  public forward() {
    if (this._currentNode.childNodes.length > 0) {
      this._currentNode = this._currentNode.lastChild as HTMLElement;
    }
    return this;
  }

  /**
   * @name backward move currentNode to "previous" node (parent of currentNode)
   * @returns {this}
   */
  public backward() {
    if (this._currentNode !== this._rootNode && this._rootNode.contains(this._currentNode) && this._currentNode.parentElement) {
      this._currentNode = this._currentNode.parentElement;
    }
    return this;
  }
}
