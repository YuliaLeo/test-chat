import { ChatWidget } from "./init-chat.js";

const defaultConfig = {
    accessKey: 'accessKey1'
};

const defaultChat = new ChatWidget(defaultConfig, 'http://localhost:4200');

const configWithCustomButton = {
    accessKey: 'accessKey2',
    generalSettings: {
        hostAppStyles: {
            container: {
                DesktopCommon: {
                    'bottom': '0',
                    'left': '30px',
                    'right': 'auto',
                    'border': '1px solid #333',
                },
                MobileExpanded: {
                    'left': '0',
                },
            }
        }
    },
    buttonSettings: {
        customTemplate: document.querySelector('#custom-template'),
    }
};

const chatWithCustomButton = new ChatWidget(configWithCustomButton, 'http://localhost:3000');

const configWithCustomStyles = {
    accessKey: 'accessKey3',
    generalSettings: {
        hostAppStyles: {
            container: {
                DesktopCommon: {
                    'top': '0',
                    'bottom': 'auto',
                },
            },
            button: {
                DesktopCommon: {
                    'background-color': 'red',
                },
                MobileNotExpanded: {
                    'background-color': 'red',
                }
            }
        },
        chatAppCssVariables: {
            '--button-height': '80px',
            '--chat-background-color': 'blue'
        }
    },
    buttonSettings: {
        appendAfterEl: document.querySelector('h1'),
        innerText: 'Chat with us',
    }
}

const chatWithCustomStyles = new ChatWidget(configWithCustomStyles, 'http://localhost:8080');

chatWithCustomStyles.show();