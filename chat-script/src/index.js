import { DeviceType, ExpandType, } from "./interfaces";
import { CHAT_TARGET_ORIGIN, DEFAULT_HOST_APP_STYLES } from "./constants";
import { ChatContainer } from "./chat-container";
import { ChatFrame } from "./chat-frame";
import { ChatButton } from "./chat-button";
export class ChatWidget {
    _config;
    _hostAppStyles;
    _htmlElements = [];
    _targetOrigin = CHAT_TARGET_ORIGIN;
    _isExpanded = false;
    get _isMobile() {
        return window.innerWidth <= this._hostAppStyles.mobileBreakPoint;
    }
    get _getDeviceType() {
        return this._isMobile ? DeviceType.Mobile : DeviceType.Desktop;
    }
    get _getExpandType() {
        return this._isExpanded ? ExpandType.Expanded : ExpandType.NotExpanded;
    }
    constructor(config) {
        this._config = config;
        this._init();
    }
    show() {
        if (this._htmlElements.length === 0) {
            return;
        }
        this._toggleChatSize();
    }
    _init() {
        this._hostAppStyles = this._getHostAppStyles();
        this._setAllElements();
        this._attachAllStyles();
        this._handleMediaQuery();
        this._appendElements();
    }
    _getHostAppStyles() {
        const userStyles = this._config.generalSettings?.hostAppStyles;
        const containerStyles = userStyles?.container || DEFAULT_HOST_APP_STYLES.container || {};
        const frameStyles = userStyles?.frame || DEFAULT_HOST_APP_STYLES.frame || {};
        const buttonStyles = userStyles?.button || DEFAULT_HOST_APP_STYLES.button || {};
        return {
            container: containerStyles,
            frame: frameStyles,
            button: buttonStyles,
            mobileBreakPoint: userStyles?.mobileBreakPoint || DEFAULT_HOST_APP_STYLES.mobileBreakPoint
        };
    }
    _setAllElements() {
        const chatFrame = new ChatFrame({
            url: this._targetOrigin,
            styles: this._hostAppStyles.frame,
            message: this._config.generalSettings?.chatAppCssVariables
        });
        const chatContainer = new ChatContainer({
            id: this._config.accessKey,
            styles: this._hostAppStyles.container,
            frameEl: chatFrame.htmlElement
        });
        const chatButton = new ChatButton({
            styles: this._hostAppStyles.button,
            clickFn: this._toggleChatSize.bind(this),
            buttonSettings: this._config?.buttonSettings,
            container: chatContainer.htmlElement
        });
        this._htmlElements.push(chatContainer, chatFrame, chatButton);
    }
    _attachAllStyles() {
        this._attachCommonStyles();
        this._attachCorrespondingStyles();
    }
    _attachCommonStyles() {
        this._htmlElements.forEach(el => el.setCommonStyles());
    }
    _attachCorrespondingStyles() {
        this._htmlElements.forEach(el => el.setCorrespondingStyles(this._getDeviceType, this._getExpandType));
    }
    _handleMediaQuery() {
        window.addEventListener('resize', () => {
            this._htmlElements.forEach(el => {
                el.setCorrespondingStyles(this._getDeviceType, this._getExpandType);
            });
        });
    }
    _toggleChatSize() {
        this._isExpanded = !this._isExpanded;
        this._attachCorrespondingStyles();
    }
    _appendElements() {
        this._htmlElements.forEach(el => el.addToDOM());
    }
}
