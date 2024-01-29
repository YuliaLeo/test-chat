import {IChatConfig, IHostAppStyles,} from "./interfaces";
import {ChatContainer} from "./chat-container";
import {ChatHtmlElement} from "./html-element";
import {ChatFrame} from "./chat-frame";
import {ChatButton} from "./chat-button";
import {ChatState} from "./chat-state";
import {ChatStylesService} from "./chat-styles-service";

export class ChatWidget {
    public url: string; // TODO: remove, temporary parameter to test different frameworks

    private _config!: IChatConfig;

    private _hostAppStyles!: IHostAppStyles;

    private _chatState!: ChatState;

    private _htmlElements: ChatHtmlElement[] = [];

    public get config(): IChatConfig {
        return this._config;
    }

    public get hostAppStyles(): IHostAppStyles {
        return this._hostAppStyles;
    }

    public get chatState(): ChatState {
        return this._chatState;
    }

    constructor(
        config: IChatConfig,
        url: string
    ) {
        this._config = config;
        this.url = url;
        this._init();
    }

    public show() {
        if (this._htmlElements.length === 0) {
            return;
        }

        this._toggleChatSize();
    }

    public register(htmlElement: ChatHtmlElement) {
        this._htmlElements.push(htmlElement);
    }

    private _init() {
        this._hostAppStyles = ChatStylesService.getHostAppStyles(this._config.generalSettings?.hostAppStyles);
        this._chatState = new ChatState(this._hostAppStyles.mobileBreakPoint);

        this._setAllElements();
        this._attachAllStyles();
        this._handleMediaQuery();
        this._appendElements();
    }

    private _setAllElements() {
        new ChatContainer(this);
        new ChatFrame(this);
        new ChatButton(this);
    }

    private _attachAllStyles() {
        this._attachCommonStyles();
        this._attachCorrespondingStyles();
    }

    private _attachCommonStyles() {
        this._htmlElements.forEach(el => el.setCommonStyles());
    }

    private _attachCorrespondingStyles() {
        this._htmlElements.forEach(el => el.setCorrespondingStyles());
    }

    private _handleMediaQuery() {
        window.addEventListener('resize', () => this._attachCorrespondingStyles());
    }

    private _toggleChatSize() {
        this._chatState.toggleExpanded();
        this._attachCorrespondingStyles();
    }

    private _appendElements() {
        this._htmlElements.forEach(el => el.addToDOM());
    }
}