import { StyleKey } from "./interfaces";
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
