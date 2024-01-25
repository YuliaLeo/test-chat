import { ChatHtmlElement } from "./html-element";
export class ChatFrame extends ChatHtmlElement {
    _el;
    constructor(url, styles) {
        super(styles);
        this.set();
        this._setParams(url);
    }
    sendMessage(message) {
        this._el.addEventListener('load', () => {
            this._el?.contentWindow?.postMessage(message, this._el.src);
        });
    }
    set() {
        this._el = document.createElement('iframe');
    }
    changeAppearance(deviceType, expandType) {
    }
    _setParams(url) {
        this._el.src = url;
    }
}
