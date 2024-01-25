import {ChatHtmlElement} from "./html-element";
import {DeviceType, ElementStyles, ExpandType} from "./interfaces";

export class ChatFrame extends ChatHtmlElement {
    protected _el!: HTMLIFrameElement;

    constructor(url: string, styles: ElementStyles) {
        super(styles);
        this.set();
        this._setParams(url);
    }

    public sendMessage(message: Record<string, string>) {
        this._el.addEventListener('load', () => {
            this._el?.contentWindow?.postMessage(message, this._el.src);
        });
    }

    protected set() {
        this._el = document.createElement('iframe');
    }

    protected changeAppearance(deviceType: DeviceType, expandType: ExpandType) {
    }

    private _setParams(url: string) {
        this._el.src = url;
    }
}