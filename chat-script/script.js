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
    _params;
    constructor(params) {
        super(params.styles);
        this._params = params;
        this._init();
    }
    addToDOM() {
        this._el.append(this._params.frameEl);
        document.body.appendChild(this._el);
    }
    set() {
        this._el = document.createElement('div');
    }
    changeAppearance(deviceType, expandType) {
    }
    _init() {
        this.set();
        this._setParams();
    }
    _setParams() {
        this._el.id = this._params.id;
    }
}
export class ChatFrame extends ChatHtmlElement {
    _el;
    _params;
    constructor(params) {
        super(params.styles);
        this._params = params;
        this._init();
    }
    changeAppearance(deviceType, expandType) { }
    addToDOM() { }
    set() {
        this._el = document.createElement('iframe');
    }
    _init() {
        this.set();
        this._setParams();
        this._sendMessageOnLoad();
    }
    _setParams() {
        this._el.src = this._params.url;
    }
    _sendMessageOnLoad() {
        if (!this._params.message) {
            return;
        }
        this._el.addEventListener('load', () => {
            this._el?.contentWindow?.postMessage(this._params.message, this._el.src);
        });
    }
}
export class ChatButton extends ChatHtmlElement {
    _el;
    _buttonParams;
    _isCustom = false;
    constructor(buttonParams) {
        super(buttonParams.styles);
        this._buttonParams = buttonParams;
        this.set();
    }
    set() {
        if (this._buttonParams?.buttonSettings?.customTemplate) {
            this._el = this._buttonParams.buttonSettings.customTemplate;
            this._styles = {};
            this._isCustom = true;
        }
        else {
            this._el = document.createElement('button');
        }
        this._el.addEventListener('click', () => this._buttonParams.clickFn());
    }
    changeAppearance(deviceType, expandType) {
        if (this._isCustom) {
            this._el.className = '';
            this._el.classList.add(deviceType, expandType);
            return;
        }
        if (deviceType === DeviceType.Mobile && expandType === ExpandType.Expanded) {
            this._el.innerHTML = 'X';
            return;
        }
        this._el.innerHTML = this._buttonParams?.buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
    }
    addToDOM() {
        if (!this._isCustom) {
            if (this._buttonParams?.buttonSettings?.appendBeforeEl) {
                this._buttonParams?.buttonSettings.appendBeforeEl.before(this._el);
            }
            else if (this._buttonParams?.buttonSettings?.appendAfterEl) {
                this._buttonParams?.buttonSettings.appendAfterEl.after(this._el);
            }
            else {
                this._buttonParams?.container?.prepend(this._el);
            }
        }
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
