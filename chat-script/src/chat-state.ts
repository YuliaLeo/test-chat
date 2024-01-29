import {DeviceType, ExpandType} from "./interfaces";

export class ChatState {
    private _isExpanded: boolean = false;

    private _mobileBreakPoint: number = 0;

    public get isMobile(): boolean {
        return window.innerWidth <= this._mobileBreakPoint;
    }

    public get deviceType(): DeviceType {
        return this.isMobile ? DeviceType.Mobile : DeviceType.Desktop;
    }

    public get expandType(): ExpandType {
        return this._isExpanded ? ExpandType.Expanded : ExpandType.NotExpanded;
    }

    constructor(mobileBreakPoint: number) {
        this._mobileBreakPoint = mobileBreakPoint;
    }

    public toggleExpanded() {
        this._isExpanded = !this._isExpanded;
    }
}