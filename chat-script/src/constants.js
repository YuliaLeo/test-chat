export const CHAT_TARGET_ORIGIN = 'http://localhost:4200';
export const DEFAULT_HOST_APP_STYLES = {
    container: {
        Common: {
            'position': 'fixed',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
        },
        DesktopCommon: {
            'bottom': '0',
            'right': '30px',
            'width': 'auto',
            'height': 'auto',
        },
        MobileCommon: {
            'bottom': '0',
        },
        MobileExpanded: {
            'right': '0',
            'width': '100%',
            'height': '100%',
        },
        MobileNotExpanded: {
            'right': '20px',
            'width': 'auto',
            'height': 'auto',
        },
    },
    frame: {
        Common: {
            'border': 'none',
        },
        DesktopExpanded: {
            'width': '400px',
            'height': '500px',
            'visibility': 'visible',
            'display': 'block',
        },
        DesktopNotExpanded: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
        MobileExpanded: {
            'width': '100%',
            'height': '100%',
            'visibility': 'visible',
            'display': 'block',
        },
        MobileNotExpanded: {
            'height': '0',
            'width': '0',
            'visibility': 'hidden',
            'display': 'none',
        },
    },
    button: {
        Common: {
            'border': 'none',
            'font-size': '16px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'cursor': 'pointer'
        },
        DesktopCommon: {
            'position': 'static',
            'width': '80px',
            'height': '40px',
            'border-radius': '10px',
            'background-color': '#4caf50',
            'color': 'white',
        },
        MobileExpanded: {
            'position': 'fixed',
            'top': '10px',
            'right': '10px',
            'width': '20px',
            'height': '20px',
            'font-size': '20px',
            'border-radius': '0',
            'background-color': 'transparent',
            'color': '#000',
        },
        MobileNotExpanded: {
            'position': 'static',
            'width': '70px',
            'height': '40px',
            'font-size': '18px',
            'border-radius': '5px',
            'background-color': '#4caf50',
            'color': 'white',
        },
    },
    mobileBreakPoint: 768
};
const DEFAULT_BUTTON_SETTINGS = {
    innerText: 'Chat',
};
