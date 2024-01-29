import { ChatHtmlElement } from "./html-element";
export class ChatContainer extends ChatHtmlElement {
    _el;
    _params;
    constructor(params) {
        super(params.styles);
        this._params = params;
        this._init();
    }
    addToDOM() {
        this._el.append(this._params.frameEl);
        document.body.appendChild(this._el);
    }
    set() {
        this._el = document.createElement('div');
    }
    changeAppearance(deviceType, expandType) {
    }
    _init() {
        this.set();
        this._setParams();
    }
    _setParams() {
        this._el.id = this._params.id;
    }
}
