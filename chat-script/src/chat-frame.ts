import {ChatHtmlElement} from "./html-element";
import {ChatWidget} from "./index";

export class ChatFrame extends ChatHtmlElement {
    protected el!: HTMLIFrameElement;

    constructor(chatWidget: ChatWidget) {
        super(chatWidget, chatWidget.hostAppStyles.frame);
        this.chatWidget.register(this);
        this._init();
    }

    public addToDOM(): void {
        const container = document.querySelector(`#${this.chatWidget.config.accessKey}`);
        container?.append(this.el);
    }

    protected changeAppearance() {}

    protected set() {
        this.el = document.createElement('iframe');
    }

    private _init() {
        this.set();
        this._setParams();
        this._sendMessageOnLoad();
    }

    private _setParams() {
        this.el.src = this.chatWidget.url;
    }

    private _sendMessageOnLoad() {
        const message = this.chatWidget.config.generalSettings?.chatAppCssVariables;

        if (!message) {
            return;
        }

        this.el.addEventListener('load', () => {
            this.el?.contentWindow?.postMessage(message, this.el.src);
        });
    }
}