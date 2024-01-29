import {ChatHtmlElement} from "./html-element";
import {DeviceType, ExpandType} from "./interfaces";
import {BUTTON_CLOSE, DEFAULT_BUTTON_SETTINGS} from "./constants";
import {ChatWidget} from "./index";

export class ChatButton extends ChatHtmlElement {
    protected el!: HTMLButtonElement;

    private _isCustom: boolean = false;

    constructor(chatWidget: ChatWidget) {
        super(chatWidget, chatWidget.hostAppStyles.button);
        this.chatWidget.register(this);
        this.set();
    }

    public addToDOM(): void {
        if (!this._isCustom) {
            const settings = this.chatWidget.config?.buttonSettings;

            if (settings?.appendBeforeEl) {
                settings.appendBeforeEl.before(this.el);
            } else if (settings?.appendAfterEl) {
                settings.appendAfterEl.after(this.el);
            } else {
                const container = document.querySelector(`#${this.chatWidget.config.accessKey}`);
                container?.prepend(this.el);
            }
        }
    }

    protected set() {
        const customTemplate = this.chatWidget.config?.buttonSettings?.customTemplate;

        if (customTemplate) {
            this.el =  customTemplate;
            this.styles = {};
            this._isCustom = true;
        } else {
            this.el = document.createElement('button');
        }

        this.el.addEventListener('click', () => this.chatWidget.show());
    }

    protected changeAppearance() {
        const deviceType = this.chatWidget.chatState.deviceType;
        const expandType = this.chatWidget.chatState.expandType;

        if (this._isCustom) {
            this.el.className = '';
            this.el.classList.add(deviceType, expandType);
            return;
        }

        if (deviceType === DeviceType.Mobile && expandType === ExpandType.Expanded) {
            this.el.innerHTML = BUTTON_CLOSE;
            return;
        }

        this.el.innerHTML =  this.chatWidget.config?.buttonSettings?.innerText
            || DEFAULT_BUTTON_SETTINGS.innerText;
    }
}
