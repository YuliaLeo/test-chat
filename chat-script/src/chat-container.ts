import {ChatHtmlElement} from "./html-element";
import {DeviceType, ElementStyles, ExpandType} from "./interfaces";

export class ChatContainer extends ChatHtmlElement {
    protected _el!: HTMLDivElement;

    constructor(id: string, styles: ElementStyles) {
        super(styles);
        this.set();
        this._setParams(id);
    }

    protected set() {
        this._el = document.createElement('div');
    }

    protected changeAppearance(deviceType: DeviceType, expandType: ExpandType) {
    }

    private _setParams(id: string) {
        this._el.id = id;
    }
}