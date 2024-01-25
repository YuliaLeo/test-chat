import { ChatHtmlElement } from "./html-element";
import { DeviceType, ExpandType } from "./interfaces";
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
        this._el.innerHTML = this._buttonSettings?.innerText;
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
        this._el.innerHTML = this._buttonSettings?.innerText;
    }
}
