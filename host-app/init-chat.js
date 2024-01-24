const CHAT_TARGET_ORIGIN = 'http://localhost:4200';
const DEFAULT_HOST_APP_STYLES = {
    containerStyles: {
        common: {
            'position': 'fixed',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
        },
        desktop: {
            'bottom': '0',
            'right': '30px',
            'width': 'auto',
            'height': 'auto',
        },
        desktopExtended: {
            'bottom': '0',
            'right': '30px',
            'width': 'auto',
            'height': 'auto',
        },
        mobile: {
            'bottom': '0',
            'right': '20px',
            'width': 'auto',
            'height': 'auto',
        },
        mobileExtended: {
            'bottom': '0',
            'right': '0',
            'width': '100%',
            'height': '100%',
        }
    },
    frameStyles: {
        common: {
            'border': 'none',
        },
        desktop: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
        desktopExtended: {
            'width': '400px',
            'height': '500px',
            'visibility': 'visible',
            'display': 'block',
        },
        mobile: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
        mobileExtended: {
            'width': '100%',
            'height': '100%',
            'visibility': 'visible',
            'display': 'block',
        }
    },
    mobileBreakPoint: 768
};
const DEFAULT_BUTTON_SETTINGS = {
    innerText: 'Chat',
    styles: {
        common: {
            'border': 'none',
            'font-size': '16px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'cursor': 'pointer'
        },
        desktop: {
            'position': 'static',
            'width': '80px',
            'height': '40px',
            'border-radius': '10px',
            'background-color': '#4caf50',
            'color': 'white',
        },
        desktopExtended: {
            'position': 'static',
            'width': '80px',
            'height': '40px',
            'border-radius': '10px',
            'background-color': '#4caf50',
            'color': 'white',
        },
        mobile: {
            'position': 'static',
            'width': '70px',
            'height': '40px',
            'font-size': '18px',
            'border-radius': '5px',
            'background-color': '#4caf50',
            'color': 'white',
        },
        mobileExtended: {
            'position': 'fixed',
            'top': '10px',
            'right': '10px',
            'width': '20px',
            'height': '20px',
            'font-size': '20px',
            'border-radius': '0',
            'background-color': 'transparent',
            'color': '#000',
        }
    }
};
export class ChatWidget {
    _config;
    _chatContainer;
    _chatFrame;
    _chatButton;
    _hostAppStyles;
    _buttonStyles;
    _targetOrigin = CHAT_TARGET_ORIGIN;
    _isExpanded = false;
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
        this._chatContainer = this._getChatContainer();
        this._chatFrame = this._getChatFrame();
        this._chatButton = this._getChatButton();
        this._hostAppStyles = this._getHostAppStyles();
        this._buttonStyles = this._getScreenSettings(this._config.buttonSettings?.styles, DEFAULT_BUTTON_SETTINGS.styles);
        this._attachAllStyles();
        this._attachFrameInitialStyles();
        this._handleMediaQuery();
        this._sendMessageOnLoad();
        this._startHandlingChatSize();
        this._appendElements();
    }
    _getChatContainer() {
        const chatContainer = document.createElement('div');
        chatContainer.id = this._config.accessKey;
        return chatContainer;
    }
    _getChatFrame() {
        const chatFrame = document.createElement('iframe');
        chatFrame.src = this._targetOrigin;
        return chatFrame;
    }
    _getChatButton() {
        const buttonTemplate = this._config.buttonSettings?.customTemplate;
        if (!buttonTemplate) {
            const chatButton = document.createElement('button');
            chatButton.innerHTML = this._config.buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
            return chatButton;
        }
        return buttonTemplate;
    }
    _getHostAppStyles() {
        return {
            containerStyles: this._getScreenSettings(this._config.generalSettings?.hostAppStyles?.containerStyles, DEFAULT_HOST_APP_STYLES.containerStyles),
            frameStyles: this._getScreenSettings(this._config.generalSettings?.hostAppStyles?.frameStyles, DEFAULT_HOST_APP_STYLES.frameStyles),
            mobileBreakPoint: this._config.generalSettings?.hostAppStyles?.mobileBreakPoint
                || DEFAULT_HOST_APP_STYLES.mobileBreakPoint
        };
    }
    _getScreenSettings(configSettings, constSettings) {
        return {
            common: configSettings?.common || constSettings?.common,
            desktop: configSettings?.desktop || constSettings?.desktop,
            mobile: configSettings?.mobile || constSettings?.mobile,
            desktopExtended: configSettings?.desktopExtended || constSettings?.desktopExtended,
            mobileExtended: configSettings?.mobileExtended || constSettings?.mobileExtended,
        };
    }
    _attachAllStyles() {
        this._attachCommonStyles();
        this._attachScreenStyles(this._isMobile());
    }
    _attachCommonStyles() {
        this._attachStyles(this._chatContainer, this._hostAppStyles.containerStyles?.common);
        this._attachStyles(this._chatFrame, this._hostAppStyles.frameStyles?.common);
        this._attachStyles(this._chatButton, this._buttonStyles.common);
    }
    _attachScreenStyles(isMobile) {
        if (isMobile) {
            if (this._isExpanded) {
                this._attachMobileExpandedStyles();
            }
            else {
                this._attachMobileStyles();
            }
        }
        else {
            if (this._isExpanded) {
                this._attachDesktopExpandedStyles();
            }
            else {
                this._attachDesktopStyles();
            }
        }
    }
    _isMobile() {
        return window.innerWidth <= this._hostAppStyles.mobileBreakPoint;
    }
    _attachStyles(el, styles) {
        Object.keys(styles).forEach(key => {
            el.style.setProperty(key, styles[key]);
        });
    }
    _attachFrameInitialStyles() {
        this._chatFrame.style.display = 'none';
        this._chatFrame.style.visibility = 'hidden';
    }
    _handleMediaQuery() {
        const mediaQuery = window.matchMedia(`(max-width: ${this._hostAppStyles.mobileBreakPoint}px)`);
        mediaQuery.addEventListener('change', (e) => {
            this._attachScreenStyles(e.matches);
        });
    }
    _sendMessageOnLoad() {
        const message = this._config.generalSettings?.chatAppCssVariables;
        if (message) {
            this._chatFrame.addEventListener('load', () => {
                this._chatFrame.contentWindow?.postMessage(message, this._targetOrigin);
            });
        }
    }
    _startHandlingChatSize() {
        this._chatButton.addEventListener('click', () => this._toggleChatSize());
    }
    _toggleChatSize() {
        if (this._isExpanded) {
            this._chatFrame.style.visibility = 'hidden';
            this._chatFrame.style.display = 'none';
            if (this._isMobile()) {
                this._attachMobileStyles();
            }
            else {
                this._attachDesktopStyles();
            }
        }
        else {
            this._chatFrame.style.visibility = 'visible';
            this._chatFrame.style.display = 'block';
            if (this._isMobile()) {
                this._attachMobileExpandedStyles();
            }
            else {
                this._attachDesktopExpandedStyles();
            }
        }
        this._isExpanded = !this._isExpanded;
    }
    _attachMobileStyles() {
        this._attachStyles(this._chatContainer, this._hostAppStyles.containerStyles?.mobile);
        this._attachStyles(this._chatFrame, this._hostAppStyles.frameStyles?.mobile);
        this._attachStyles(this._chatButton, this._buttonStyles.mobile);
        this._chatButton.innerText = this._config.buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
    }
    _attachDesktopStyles() {
        this._attachStyles(this._chatContainer, this._hostAppStyles.containerStyles?.desktop);
        this._attachStyles(this._chatFrame, this._hostAppStyles.frameStyles?.desktop);
        this._attachStyles(this._chatButton, this._buttonStyles.desktop);
        this._chatButton.innerText = this._config.buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
    }
    _attachMobileExpandedStyles() {
        this._attachStyles(this._chatContainer, this._hostAppStyles.containerStyles?.mobileExtended);
        this._attachStyles(this._chatFrame, this._hostAppStyles.frameStyles?.mobileExtended);
        this._attachStyles(this._chatButton, this._buttonStyles.mobileExtended);
        this._chatButton.innerText = '×';
    }
    _attachDesktopExpandedStyles() {
        this._attachStyles(this._chatContainer, this._hostAppStyles.containerStyles?.desktopExtended);
        this._attachStyles(this._chatFrame, this._hostAppStyles.frameStyles?.desktopExtended);
        this._attachStyles(this._chatButton, this._buttonStyles.desktopExtended);
        this._chatButton.innerText = this._config.buttonSettings?.innerText || DEFAULT_BUTTON_SETTINGS.innerText;
    }
    _appendElements() {
        this._attachButton();
        this._chatContainer.appendChild(this._chatFrame);
        document.body.appendChild(this._chatContainer);
    }
    _attachButton() {
        if (!this._config.buttonSettings?.customTemplate) {
            if (this._config.buttonSettings?.appendBeforeEl) {
                this._config.buttonSettings.appendBeforeEl.before(this._chatButton);
            }
            else if (this._config.buttonSettings?.appendAfterEl) {
                this._config.buttonSettings.appendAfterEl.after(this._chatButton);
            }
            else {
                this._chatContainer.appendChild(this._chatButton);
            }
        }
    }
}
