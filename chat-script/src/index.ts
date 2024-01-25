import {DeviceType, ElementStyles, ExpandType, IChatConfig, IHostAppStyles,} from "./interfaces";
import {CHAT_TARGET_ORIGIN, DEFAULT_HOST_APP_STYLES} from "./constants";
import {ChatContainer} from "./chat-container";
import {ChatHtmlElement} from "./html-element";
import {ChatFrame} from "./chat-frame";
import {ChatButton} from "./chat-button";

export class ChatWidget {
    private _config!: IChatConfig;

    private _hostAppStyles!: IHostAppStyles;

    private _htmlElements: ChatHtmlElement[] = [];

    private _chatContainer!: ChatContainer;

    private _chatFrame!: ChatFrame;

    private _chatButton!: ChatButton;

    private _targetOrigin: string = CHAT_TARGET_ORIGIN;

    private _isExpanded: boolean = false;

    private get _isMobile(): boolean {
        return window.innerWidth <= this._hostAppStyles.mobileBreakPoint!;
    }

    private get _getDeviceType(): DeviceType {
        return this._isMobile ? DeviceType.Mobile : DeviceType.Desktop;
    }

    private get _getExpandType(): ExpandType {
        return this._isExpanded ? ExpandType.Expanded : ExpandType.NotExpanded;
    }

    constructor(
        config: IChatConfig
    ) {
        this._config = config;
        this._init();
    }

    public show() {
        if (!this._chatFrame) {
            return;
        }

        this._toggleChatSize();
    }

    private _init() {
        this._hostAppStyles = this._getHostAppStyles();

        this._setAllElements();
        this._attachAllStyles();
        this._handleMediaQuery();
        this._sendMessageOnLoad();
        this._startHandlingChatSize();
        this._appendElements();
    }

    private _getHostAppStyles(): IHostAppStyles {
        const userStyles = this._config.generalSettings?.hostAppStyles;
        const containerStyles: ElementStyles = userStyles?.container || DEFAULT_HOST_APP_STYLES.container || {};
        const frameStyles: ElementStyles = userStyles?.frame || DEFAULT_HOST_APP_STYLES.frame || {};
        const buttonStyles: ElementStyles = userStyles?.button || DEFAULT_HOST_APP_STYLES.button || {};

        return {
            container: containerStyles,
            frame: frameStyles,
            button: buttonStyles,
            mobileBreakPoint: userStyles?.mobileBreakPoint || DEFAULT_HOST_APP_STYLES.mobileBreakPoint
        };
    }

    private _setAllElements() {
        this._chatContainer = new ChatContainer(this._config.accessKey, this._hostAppStyles.container!);
        this._chatFrame = new ChatFrame(this._targetOrigin, this._hostAppStyles.frame!);
        this._chatButton = new ChatButton(this._hostAppStyles.button!);
        this._htmlElements.push(this._chatContainer, this._chatFrame, this._chatButton);
    }

    private _attachAllStyles() {
        this._attachCommonStyles();
        this._attachCorrespondingStyles();
    }

    private _attachCommonStyles() {
        this._htmlElements.forEach(el => el.setCommonStyles());
    }

    private _attachCorrespondingStyles() {
        this._htmlElements.forEach(el => el.setCorrespondingStyles(this._getDeviceType, this._getExpandType));
    }

    private _handleMediaQuery() {
        window.addEventListener('resize', () => {
            this._htmlElements.forEach(el => {
                el.setCorrespondingStyles(this._getDeviceType, this._getExpandType);
            });
        });
    }

    private _sendMessageOnLoad() {
        const message = this._config.generalSettings?.chatAppCssVariables;

        if (message) {
            this._chatFrame.sendMessage(message);
        }
    }

    private _startHandlingChatSize() {
        this._chatButton.htmlElement.addEventListener('click', () => this._toggleChatSize());
    }

    private _toggleChatSize() {
        this._isExpanded = !this._isExpanded;
        this._attachCorrespondingStyles();
    }

    private _appendElements() {
        this._chatButton.attachTo(this._chatContainer.htmlElement);
        this._chatContainer.htmlElement.appendChild(this._chatFrame.htmlElement);
        document.body.appendChild(this._chatContainer.htmlElement);
    }
}