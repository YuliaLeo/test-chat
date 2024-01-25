import { ChatHtmlElement } from "./html-element";
export class ChatContainer extends ChatHtmlElement {
    _el;
    constructor(id, styles) {
        super(styles);
        this.set();
        this._setParams(id);
    }
    set() {
        this._el = document.createElement('div');
    }
    changeAppearance(deviceType, expandType) {
    }
    _setParams(id) {
        this._el.id = id;
    }
}
