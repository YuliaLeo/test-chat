import {DeviceType, ElementStyles, ExpandType, StyleKey} from "./interfaces";

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