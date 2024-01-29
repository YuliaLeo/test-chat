import {ElementStyles, StyleKey} from "./interfaces";
import {ChatWidget} from "./index";

export abstract class ChatHtmlElement {
    protected abstract el: HTMLElement;

    protected abstract set(): void;

    protected abstract changeAppearance(): void;

    public abstract addToDOM(): void;

    protected chatWidget: ChatWidget;

    protected styles: ElementStyles;

    protected constructor(
        chatWidget: ChatWidget,
        styles: ElementStyles
    ) {
        this.chatWidget = chatWidget;
        this.styles = styles;
    }

    public setCommonStyles() {
        this._attachStyles(StyleKey.Common);
    }

    public setCorrespondingStyles() {
        const deviceType = this.chatWidget.chatState.deviceType;
        const expandType = this.chatWidget.chatState.expandType;
        const commonStyleKey = `${deviceType}${StyleKey.Common}` as StyleKey;
        const styleKey = `${deviceType}${expandType}` as StyleKey;

        this.changeAppearance();
        this._attachStyles(commonStyleKey);
        this._attachStyles(styleKey);
    }

    private _attachStyles(styleKey: StyleKey) {
        const styles: Record<string, string> | undefined = this.styles[styleKey];

        if (!styles) {
            return;
        }

        Object.keys(styles).forEach(key => {
            this.el.style.setProperty(key, styles[key]);
        });
    }
}