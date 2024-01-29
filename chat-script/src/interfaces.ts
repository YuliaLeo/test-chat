export interface IChatConfig {
    accessKey: string;
    generalSettings?: IGeneralSettings;
    buttonSettings?: IButtonSettings;
}

export interface IGeneralSettings {
    hostAppStyles: IHostAppStyles;
    chatAppCssVariables?: Record<string, string>;
}

export interface IButtonSettings {
    customTemplate?: HTMLButtonElement;
    appendBeforeEl?: HTMLElement;
    appendAfterEl?: HTMLElement;
    innerText: string;
}

export interface IHostAppStyles {
    container: ElementStyles;
    frame: ElementStyles;
    button: ElementStyles;
    mobileBreakPoint: number;
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
    DesktopCommon = 'DesktopCommon',
    DesktopExpanded = 'DesktopExpanded',
    DesktopNotExpanded = 'DesktopNotExpanded',
    MobileExpanded = 'MobileExpanded',
    MobileNotExpanded = 'MobileNotExpanded',
    MobileCommon = 'MobileCommon'
}

export type ElementStyles = {
    [key in StyleKey]?: Record<string, string>;
}