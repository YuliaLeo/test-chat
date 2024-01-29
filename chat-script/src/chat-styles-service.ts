import {ElementStyles, IHostAppStyles} from "./interfaces";
import {DEFAULT_HOST_APP_STYLES} from "./constants";

export class ChatStylesService {
    public static getHostAppStyles(userStyles?: IHostAppStyles): IHostAppStyles {
        return {
            container: this._getElementStyles(userStyles?.container, DEFAULT_HOST_APP_STYLES.container),
            frame: this._getElementStyles(userStyles?.frame, DEFAULT_HOST_APP_STYLES.frame),
            button: this._getElementStyles(userStyles?.button, DEFAULT_HOST_APP_STYLES.button),
            mobileBreakPoint: userStyles?.mobileBreakPoint || DEFAULT_HOST_APP_STYLES.mobileBreakPoint
        };
    }

    private static _getElementStyles(userElementStyles?: ElementStyles, defaultElementStyles?: ElementStyles): ElementStyles {
        return {
            Common: this._getOverlappedStyles(userElementStyles?.Common, defaultElementStyles?.Common),
            DesktopCommon: this._getOverlappedStyles(userElementStyles?.DesktopCommon, defaultElementStyles?.DesktopCommon),
            DesktopExpanded: this._getOverlappedStyles(userElementStyles?.DesktopExpanded, defaultElementStyles?.DesktopExpanded),
            DesktopNotExpanded: this._getOverlappedStyles(userElementStyles?.DesktopNotExpanded, defaultElementStyles?.DesktopNotExpanded),
            MobileExpanded: this._getOverlappedStyles(userElementStyles?.MobileExpanded, defaultElementStyles?.MobileExpanded),
            MobileNotExpanded: this._getOverlappedStyles(userElementStyles?.MobileNotExpanded, defaultElementStyles?.MobileNotExpanded),
            MobileCommon: this._getOverlappedStyles(userElementStyles?.MobileCommon, defaultElementStyles?.MobileCommon),
        };
    }
    
    private static _getOverlappedStyles(styles?: Record<string, string>, defaultStyles?: Record<string, string>) {
        if (!!styles && !!defaultStyles) {
            return {...defaultStyles, ...styles};
        }

        return styles || defaultStyles || {};
    }
}