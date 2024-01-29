import {ChatHtmlElement} from "./html-element";
import {ChatWidget} from "./index";

export class ChatContainer extends ChatHtmlElement {
    protected el!: HTMLDivElement;

    constructor(
        chatWidget: ChatWidget
    ) {
        super(chatWidget, chatWidget.hostAppStyles.container);
        this.chatWidget.register(this);
        this._init();
    }

    public addToDOM() {
        document.body.appendChild(this.el);
    }

    protected set() {
        this.el = document.createElement('div');
    }

    protected changeAppearance() {}

    private _init() {
        this.set();
        this._setParams();
    }

    private _setParams() {
        this.el.id = this.chatWidget.config.accessKey;
    }
}