import { ChatHtmlElement } from "./html-element";
export class ChatFrame extends ChatHtmlElement {
    _el;
    _params;
    constructor(params) {
        super(params.styles);
        this._params = params;
        this._init();
    }
    changeAppearance(deviceType, expandType) { }
    addToDOM() { }
    set() {
        this._el = document.createElement('iframe');
    }
    _init() {
        this.set();
        this._setParams();
        this._sendMessageOnLoad();
    }
    _setParams() {
        this._el.src = this._params.url;
    }
    _sendMessageOnLoad() {
        if (!this._params.message) {
            return;
        }
        this._el.addEventListener('load', () => {
            this._el?.contentWindow?.postMessage(this._params.message, this._el.src);
        });
    }
}
