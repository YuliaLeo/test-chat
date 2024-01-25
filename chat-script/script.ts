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

export abstract class ChatHtmlElement {
    protected abstract _el: HTMLElement;

    protected abstract set(): void;

    protected abstract changeAppearance(deviceType: DeviceType, expandType: ExpandType): void;

    protected _styles: ElementStyles;

    public get htmlElement(): HTMLElement {
        return this._el;
    }

    protected constructor(styles: ElementStyles) {
        this._styles = styles;
    }

    public setCommonStyles() {
        this._attachStyles(StyleKey.Common);
    }

    public setCorrespondingStyles(deviceType: DeviceType, expandType: ExpandType) {
        const commonStyleKey = `${deviceType}${StyleKey.Common}` as StyleKey;
        const styleKey = `${deviceType}${expandType}` as StyleKey;

        this.changeAppearance(deviceType, expandType);
        this._attachStyles(commonStyleKey);
        this._attachStyles(styleKey);
    }

    private _attachStyles(styleKey: StyleKey) {
        const styles: Record<string, string> | undefined = this._styles[styleKey];

        if (!styles) {
            return;
        }

        Object.keys(styles).forEach(key => {
            this._el.style.setProperty(key, styles[key]);
        });
    }
}

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

export class ChatButton extends ChatHtmlElement {
    protected _el!: HTMLButtonElement;

    private _buttonSettings?: IButtonSettings;

    private _isCustom: boolean = false;

    constructor(styles: ElementStyles, buttonSettings?: IButtonSettings) {
        super(styles);
        this._buttonSettings = buttonSettings;
        this.set();
    }

    public attachTo(container: HTMLElement) {
        if (!this._isCustom) {
            if (this._buttonSettings?.appendBeforeEl) {
                this._buttonSettings.appendBeforeEl.before(this._el);
            } else if (this._buttonSettings?.appendAfterEl) {
                this._buttonSettings.appendAfterEl.after(this._el);
            } else {
                container.appendChild(this._el);
            }
        }
    }

    protected set() {
        if (this._buttonSettings?.customTemplate) {
            this._el = this._buttonSettings.customTemplate;
            this._isCustom = true;
            return;
        }

        this._el = document.createElement('button');
    }

    protected changeAppearance(deviceType: DeviceType, expandType: ExpandType) {
        if (this._isCustom) {
            this._el.classList.add(deviceType, expandType);
            return;
        }

        if (deviceType === DeviceType.Mobile && expandType === ExpandType.Expanded) {
            this._el.innerHTML = 'X';
            return;
        }

        this._el.innerHTML = this._buttonSettings?.innerText! || DEFAULT_BUTTON_SETTINGS.innerText!;
    }
}

export interface IChatConfig {
    accessKey: string;
    generalSettings?: IGeneralSettings;
    buttonSettings?: IButtonSettings;
}

export interface IGeneralSettings {
    hostAppStyles?: IHostAppStyles;
    chatAppCssVariables?: Record<string, string>;
}

export interface IButtonSettings {
    customTemplate?: HTMLButtonElement;
    appendBeforeEl?: HTMLElement;
    appendAfterEl?: HTMLElement;
    innerText?: string;
}

export interface IHostAppStyles {
    container?: ElementStyles;
    frame?: ElementStyles;
    button?: ElementStyles;
    mobileBreakPoint?: number;
}

export enum DeviceType {
    Desktop = 'Desktop',
    Mobile = 'Mobile'
}

export enum ExpandType {
    Expanded = 'Expanded',
    NotExpanded = 'NotExpanded'
}

export enum StyleKey {
    Common = 'Common',
    DesktopCommon = 'Desktop' + StyleKey.Common,
    DesktopExpanded = 'Desktop' + ExpandType.Expanded,
    DesktopNotExpanded = 'Desktop' + ExpandType.NotExpanded,
    MobileExpanded = 'Mobile' + ExpandType.Expanded,
    MobileNotExpanded = 'Mobile' + ExpandType.NotExpanded,
    MobileCommon = 'Mobile' + StyleKey.Common
}

export type ElementStyles = {
    [key in StyleKey]?: Record<string, string>;
}

export const CHAT_TARGET_ORIGIN = 'http://localhost:4200';

export const DEFAULT_HOST_APP_STYLES: IHostAppStyles = {
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
}

export const DEFAULT_BUTTON_SETTINGS: IButtonSettings = {
    innerText: 'Chat',
}