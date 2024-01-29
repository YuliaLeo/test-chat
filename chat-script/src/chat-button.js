import { ChatHtmlElement } from "./html-element";
import { DeviceType, ExpandType } from "./interfaces";
import { DEFAULT_BUTTON_SETTINGS } from "../script";
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
            this._el = this._buttonParams?.buttonSettings.customTemplate;
            this._isCustom = true;
            return;
        }
        this._el = document.createElement('button');
        this._el.addEventListener('click', () => this._buttonParams.clickFn());
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
