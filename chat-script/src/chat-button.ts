import {ChatHtmlElement} from "./html-element";
import {DeviceType, ElementStyles, ExpandType, IButtonSettings} from "./interfaces";

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
        this._el.innerHTML = this._buttonSettings?.innerText!;
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

        this._el.innerHTML = this._buttonSettings?.innerText!;
    }
}