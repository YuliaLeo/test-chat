export class ChatWidget {
    _config;
    _hostAppStyles;
    _htmlElements = [];
    _chatContainer;
    _chatFrame;
    _chatButton;
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
        if (!this._chatFrame) {
            return;
        }
        this._toggleChatSize();
    }
    _init() {
        this._hostAppStyles = this._getHostAppStyles();
        this._setAllElements();
        this._attachAllStyles();
        this._handleMediaQuery();
        this._sendMessageOnLoad();
        this._startHandlingChatSize();
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
        this._chatContainer = new ChatContainer(this._config.accessKey, this._hostAppStyles.container);
        this._chatFrame = new ChatFrame(this._targetOrigin, this._hostAppStyles.frame);
        this._chatButton = new ChatButton(this._hostAppStyles.button);
        this._htmlElements.push(this._chatContainer, this._chatFrame, this._chatButton);
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
    _sendMessageOnLoad() {
        const message = this._config.generalSettings?.chatAppCssVariables;
        if (message) {
            this._chatFrame.sendMessage(message);
        }
    }
    _startHandlingChatSize() {
        this._chatButton.htmlElement.addEventListener('click', () => this._toggleChatSize());
    }
    _toggleChatSize() {
        this._isExpanded = !this._isExpanded;
        this._attachCorrespondingStyles();
    }
    _appendElements() {
        this._chatButton.attachTo(this._chatContainer.htmlElement);
        this._chatContainer.htmlElement.appendChild(this._chatFrame.htmlElement);
        document.body.appendChild(this._chatContainer.htmlElement);
    }
}
export class ChatHtmlElement {
    _styles;
    get htmlElement() {
        return this._el;
    }
    constructor(styles) {
        this._styles = styles;
    }
    setCommonStyles() {
        this._attachStyles(StyleKey.Common);
    }
    setCorrespondingStyles(deviceType, expandType) {
        const commonStyleKey = `${deviceType}${StyleKey.Common}`;
        const styleKey = `${deviceType}${expandType}`;
        this.changeAppearance(deviceType, expandType);
        this._attachStyles(commonStyleKey);
        this._attachStyles(styleKey);
    }
    _attachStyles(styleKey) {
        const styles = this._styles[styleKey];
        if (!styles) {
            return;
        }
        Object.keys(styles).forEach(key => {
            this._el.style.setProperty(key, styles[key]);
        });
    }
}
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
export class ChatButton extends ChatHtmlElement {
    _el;
    _buttonSettings;
    _isCustom = false;
    constructor(styles, buttonSettings) {
        super(styles);
        this._buttonSettings = buttonSettings;
        this.set();
    }
    attachTo(container) {
        if (!this._isCustom) {
            if (this._buttonSettings?.appendBeforeEl) {
                this._buttonSettings.appendBeforeEl.before(this._el);
            }
            else if (this._buttonSettings?.appendAfterEl) {
                this._buttonSettings.appendAfterEl.after(this._el);
            }
            else {
                container.appendChild(this._el);
            }
        }
    }
    set() {
        if (this._buttonSettings?.customTemplate) {
            this._el = this._buttonSettings.customTemplate;
            this._isCustom = true;
            return;
        }
        this._el = document.createElement('button');
    }
    changeAppearance(deviceType, expandType) {
        if (this._isCustom) {
            this._el.classList.add(deviceType, expandType);
            return;
        }
        if (deviceType === DeviceType.Mobile && expandType === ExpandType.Expanded) {
            this._el.innerHTML = 'X';
            return;
        }
        this._el.innerHTML = this._buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
    }
}
export var DeviceType;
(function (DeviceType) {
    DeviceType["Desktop"] = "Desktop";
    DeviceType["Mobile"] = "Mobile";
})(DeviceType || (DeviceType = {}));
export var ExpandType;
(function (ExpandType) {
    ExpandType["Expanded"] = "Expanded";
    ExpandType["NotExpanded"] = "NotExpanded";
})(ExpandType || (ExpandType = {}));
export var StyleKey;
(function (StyleKey) {
    StyleKey["Common"] = "Common";
    StyleKey["DesktopCommon"] = "DesktopCommon";
    StyleKey["DesktopExpanded"] = "DesktopExpanded";
    StyleKey["DesktopNotExpanded"] = "DesktopNotExpanded";
    StyleKey["MobileExpanded"] = "MobileExpanded";
    StyleKey["MobileNotExpanded"] = "MobileNotExpanded";
    StyleKey["MobileCommon"] = "MobileCommon";
})(StyleKey || (StyleKey = {}));
export const CHAT_TARGET_ORIGIN = 'http://localhost:4200';
export const DEFAULT_HOST_APP_STYLES = {
    container: {
        Common: {
            'position': 'fixed',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
        },
        DesktopCommon: {
            'bottom': '0',
            'right': '30px',
            'width': 'auto',
            'height': 'auto',
        },
        MobileCommon: {
            'bottom': '0',
        },
        MobileExpanded: {
            'right': '0',
            'width': '100%',
            'height': '100%',
        },
        MobileNotExpanded: {
            'right': '20px',
            'width': 'auto',
            'height': 'auto',
        },
    },
    frame: {
        Common: {
            'border': 'none',
        },
        DesktopExpanded: {
            'width': '400px',
            'height': '500px',
            'visibility': 'visible',
            'display': 'block',
        },
        DesktopNotExpanded: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
        MobileExpanded: {
            'width': '100%',
            'height': '100%',
            'visibility': 'visible',
            'display': 'block',
        },
        MobileNotExpanded: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
    },
    button: {
        Common: {
            'border': 'none',
            'font-size': '16px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'cursor': 'pointer'
        },
        DesktopCommon: {
            'position': 'static',
            'width': '80px',
            'height': '40px',
            'border-radius': '10px',
            'background-color': '#4caf50',
            'color': 'white',
        },
        MobileExpanded: {
            'position': 'fixed',
            'top': '10px',
            'right': '10px',
            'width': '20px',
            'height': '20px',
            'font-size': '20px',
            'border-radius': '0',
            'background-color': 'transparent',
            'color': '#000',
        },
        MobileNotExpanded: {
            'position': 'static',
            'width': '70px',
            'height': '40px',
            'font-size': '18px',
            'border-radius': '5px',
            'background-color': '#4caf50',
            'color': 'white',
        },
    },
    mobileBreakPoint: 768
};
export const DEFAULT_BUTTON_SETTINGS = {
    innerText: 'Chat',
};
