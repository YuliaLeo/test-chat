/******/ var __webpack_modules__ = ([
    /* 0 */,
    /* 1 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatContainer = void 0;
        const html_element_1 = __webpack_require__(2);
        class ChatContainer extends html_element_1.ChatHtmlElement {
            constructor(chatWidget) {
                super(chatWidget, chatWidget.hostAppStyles.container);
                this.chatWidget.register(this);
                this._init();
            }
            addToDOM() {
                document.body.appendChild(this.el);
            }
            set() {
                this.el = document.createElement('div');
            }
            changeAppearance() { }
            _init() {
                this.set();
                this._setParams();
            }
            _setParams() {
                this.el.id = this.chatWidget.config.accessKey;
            }
        }
        exports.ChatContainer = ChatContainer;


        /***/ }),
    /* 2 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatHtmlElement = void 0;
        const interfaces_1 = __webpack_require__(3);
        class ChatHtmlElement {
            constructor(chatWidget, styles) {
                this.chatWidget = chatWidget;
                this.styles = styles;
            }
            setCommonStyles() {
                this._attachStyles(interfaces_1.StyleKey.Common);
            }
            setCorrespondingStyles() {
                const deviceType = this.chatWidget.chatState.deviceType;
                const expandType = this.chatWidget.chatState.expandType;
                const commonStyleKey = `${deviceType}${interfaces_1.StyleKey.Common}`;
                const styleKey = `${deviceType}${expandType}`;
                this.changeAppearance();
                this._attachStyles(commonStyleKey);
                this._attachStyles(styleKey);
            }
            _attachStyles(styleKey) {
                const styles = this.styles[styleKey];
                if (!styles) {
                    return;
                }
                Object.keys(styles).forEach(key => {
                    this.el.style.setProperty(key, styles[key]);
                });
            }
        }
        exports.ChatHtmlElement = ChatHtmlElement;


        /***/ }),
    /* 3 */
    /***/ ((__unused_webpack_module, exports) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.StyleKey = exports.ExpandType = exports.DeviceType = void 0;
        var DeviceType;
        (function (DeviceType) {
            DeviceType["Desktop"] = "Desktop";
            DeviceType["Mobile"] = "Mobile";
        })(DeviceType || (exports.DeviceType = DeviceType = {}));
        var ExpandType;
        (function (ExpandType) {
            ExpandType["Expanded"] = "Expanded";
            ExpandType["NotExpanded"] = "NotExpanded";
        })(ExpandType || (exports.ExpandType = ExpandType = {}));
        var StyleKey;
        (function (StyleKey) {
            StyleKey["Common"] = "Common";
            StyleKey["DesktopCommon"] = "DesktopCommon";
            StyleKey["DesktopExpanded"] = "DesktopExpanded";
            StyleKey["DesktopNotExpanded"] = "DesktopNotExpanded";
            StyleKey["MobileExpanded"] = "MobileExpanded";
            StyleKey["MobileNotExpanded"] = "MobileNotExpanded";
            StyleKey["MobileCommon"] = "MobileCommon";
        })(StyleKey || (exports.StyleKey = StyleKey = {}));


        /***/ }),
    /* 4 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatFrame = void 0;
        const html_element_1 = __webpack_require__(2);
        class ChatFrame extends html_element_1.ChatHtmlElement {
            constructor(chatWidget) {
                super(chatWidget, chatWidget.hostAppStyles.frame);
                this.chatWidget.register(this);
                this._init();
            }
            addToDOM() {
                const container = document.querySelector(`#${this.chatWidget.config.accessKey}`);
                container === null || container === void 0 ? void 0 : container.append(this.el);
            }
            changeAppearance() { }
            set() {
                this.el = document.createElement('iframe');
            }
            _init() {
                this.set();
                this._setParams();
                this._sendMessageOnLoad();
            }
            _setParams() {
                this.el.src = this.chatWidget.url;
            }
            _sendMessageOnLoad() {
                var _a;
                const message = (_a = this.chatWidget.config.generalSettings) === null || _a === void 0 ? void 0 : _a.chatAppCssVariables;
                if (!message) {
                    return;
                }
                this.el.addEventListener('load', () => {
                    var _a, _b;
                    (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, this.el.src);
                });
            }
        }
        exports.ChatFrame = ChatFrame;


        /***/ }),
    /* 5 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatButton = void 0;
        const html_element_1 = __webpack_require__(2);
        const interfaces_1 = __webpack_require__(3);
        const constants_1 = __webpack_require__(6);
        class ChatButton extends html_element_1.ChatHtmlElement {
            constructor(chatWidget) {
                super(chatWidget, chatWidget.hostAppStyles.button);
                this._isCustom = false;
                this.chatWidget.register(this);
                this.set();
            }
            addToDOM() {
                var _a;
                if (!this._isCustom) {
                    const settings = (_a = this.chatWidget.config) === null || _a === void 0 ? void 0 : _a.buttonSettings;
                    if (settings === null || settings === void 0 ? void 0 : settings.appendBeforeEl) {
                        settings.appendBeforeEl.before(this.el);
                    }
                    else if (settings === null || settings === void 0 ? void 0 : settings.appendAfterEl) {
                        settings.appendAfterEl.after(this.el);
                    }
                    else {
                        const container = document.querySelector(`#${this.chatWidget.config.accessKey}`);
                        container === null || container === void 0 ? void 0 : container.prepend(this.el);
                    }
                }
            }
            set() {
                var _a, _b;
                const customTemplate = (_b = (_a = this.chatWidget.config) === null || _a === void 0 ? void 0 : _a.buttonSettings) === null || _b === void 0 ? void 0 : _b.customTemplate;
                if (customTemplate) {
                    this.el = customTemplate;
                    this.styles = {};
                    this._isCustom = true;
                }
                else {
                    this.el = document.createElement('button');
                }
                this.el.addEventListener('click', () => this.chatWidget.show());
            }
            changeAppearance() {
                var _a, _b;
                const deviceType = this.chatWidget.chatState.deviceType;
                const expandType = this.chatWidget.chatState.expandType;
                if (this._isCustom) {
                    this.el.className = '';
                    this.el.classList.add(deviceType, expandType);
                    return;
                }
                if (deviceType === interfaces_1.DeviceType.Mobile && expandType === interfaces_1.ExpandType.Expanded) {
                    this.el.innerHTML = constants_1.BUTTON_CLOSE;
                    return;
                }
                this.el.innerHTML = ((_b = (_a = this.chatWidget.config) === null || _a === void 0 ? void 0 : _a.buttonSettings) === null || _b === void 0 ? void 0 : _b.innerText)
                    || constants_1.DEFAULT_BUTTON_SETTINGS.innerText;
            }
        }
        exports.ChatButton = ChatButton;


        /***/ }),
    /* 6 */
    /***/ ((__unused_webpack_module, exports) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.BUTTON_CLOSE = exports.DEFAULT_BUTTON_SETTINGS = exports.DEFAULT_HOST_APP_STYLES = exports.CHAT_TARGET_ORIGIN = void 0;
        exports.CHAT_TARGET_ORIGIN = 'http://localhost:4200';
        exports.DEFAULT_HOST_APP_STYLES = {
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
                    'z-index': '100',
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
                    'z-index': '1000',
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
        exports.DEFAULT_BUTTON_SETTINGS = {
            innerText: 'Chat',
        };
        exports.BUTTON_CLOSE = 'X';


        /***/ }),
    /* 7 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatState = void 0;
        const interfaces_1 = __webpack_require__(3);
        class ChatState {
            get isMobile() {
                return window.innerWidth <= this._mobileBreakPoint;
            }
            get deviceType() {
                return this.isMobile ? interfaces_1.DeviceType.Mobile : interfaces_1.DeviceType.Desktop;
            }
            get expandType() {
                return this._isExpanded ? interfaces_1.ExpandType.Expanded : interfaces_1.ExpandType.NotExpanded;
            }
            constructor(mobileBreakPoint) {
                this._isExpanded = false;
                this._mobileBreakPoint = 0;
                this._mobileBreakPoint = mobileBreakPoint;
            }
            toggleExpanded() {
                this._isExpanded = !this._isExpanded;
            }
        }
        exports.ChatState = ChatState;


        /***/ }),
    /* 8 */
    /***/ ((__unused_webpack_module, exports, __webpack_require__) => {


        Object.defineProperty(exports, "__esModule", ({ value: true }));
        exports.ChatStylesService = void 0;
        const constants_1 = __webpack_require__(6);
        class ChatStylesService {
            static getHostAppStyles(userStyles) {
                return {
                    container: this._getElementStyles(userStyles === null || userStyles === void 0 ? void 0 : userStyles.container, constants_1.DEFAULT_HOST_APP_STYLES.container),
                    frame: this._getElementStyles(userStyles === null || userStyles === void 0 ? void 0 : userStyles.frame, constants_1.DEFAULT_HOST_APP_STYLES.frame),
                    button: this._getElementStyles(userStyles === null || userStyles === void 0 ? void 0 : userStyles.button, constants_1.DEFAULT_HOST_APP_STYLES.button),
                    mobileBreakPoint: (userStyles === null || userStyles === void 0 ? void 0 : userStyles.mobileBreakPoint) || constants_1.DEFAULT_HOST_APP_STYLES.mobileBreakPoint
                };
            }
            static _getElementStyles(userElementStyles, defaultElementStyles) {
                return {
                    Common: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.Common, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.Common),
                    DesktopCommon: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.DesktopCommon, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.DesktopCommon),
                    DesktopExpanded: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.DesktopExpanded, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.DesktopExpanded),
                    DesktopNotExpanded: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.DesktopNotExpanded, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.DesktopNotExpanded),
                    MobileExpanded: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.MobileExpanded, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.MobileExpanded),
                    MobileNotExpanded: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.MobileNotExpanded, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.MobileNotExpanded),
                    MobileCommon: this._getOverlappedStyles(userElementStyles === null || userElementStyles === void 0 ? void 0 : userElementStyles.MobileCommon, defaultElementStyles === null || defaultElementStyles === void 0 ? void 0 : defaultElementStyles.MobileCommon),
                };
            }
            static _getOverlappedStyles(styles, defaultStyles) {
                if (!!styles && !!defaultStyles) {
                    return Object.assign(Object.assign({}, defaultStyles), styles);
                }
                return styles || defaultStyles || {};
            }
        }
        exports.ChatStylesService = ChatStylesService;


        /***/ })
    /******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
    /******/ 	// Check if module is in cache
    /******/ 	var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 	if (cachedModule !== undefined) {
        /******/ 		return cachedModule.exports;
        /******/ 	}
    /******/ 	// Create a new module (and put it into the cache)
    /******/ 	var module = __webpack_module_cache__[moduleId] = {
        /******/ 		// no module.id needed
        /******/ 		// no module.loaded needed
        /******/ 		exports: {}
        /******/ 	};
    /******/
    /******/ 	// Execute the module function
    /******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ 	// Return the exports of the module
    /******/ 	return module.exports;
    /******/ }
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
    var exports = __webpack_exports__;

    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ChatWidget = void 0;
    const chat_container_1 = __webpack_require__(1);
    const chat_frame_1 = __webpack_require__(4);
    const chat_button_1 = __webpack_require__(5);
    const chat_state_1 = __webpack_require__(7);
    const chat_styles_service_1 = __webpack_require__(8);
    class ChatWidget {
        get config() {
            return this._config;
        }
        get hostAppStyles() {
            return this._hostAppStyles;
        }
        get chatState() {
            return this._chatState;
        }
        constructor(config, url) {
            this._htmlElements = [];
            this._config = config;
            this.url = url;
            this._init();
        }
        show() {
            if (this._htmlElements.length === 0) {
                return;
            }
            this._toggleChatSize();
        }
        register(htmlElement) {
            this._htmlElements.push(htmlElement);
        }
        _init() {
            var _a;
            this._hostAppStyles = chat_styles_service_1.ChatStylesService.getHostAppStyles((_a = this._config.generalSettings) === null || _a === void 0 ? void 0 : _a.hostAppStyles);
            this._chatState = new chat_state_1.ChatState(this._hostAppStyles.mobileBreakPoint);
            this._setAllElements();
            this._attachAllStyles();
            this._handleMediaQuery();
            this._appendElements();
        }
        _setAllElements() {
            new chat_container_1.ChatContainer(this);
            new chat_frame_1.ChatFrame(this);
            new chat_button_1.ChatButton(this);
        }
        _attachAllStyles() {
            this._attachCommonStyles();
            this._attachCorrespondingStyles();
        }
        _attachCommonStyles() {
            this._htmlElements.forEach(el => el.setCommonStyles());
        }
        _attachCorrespondingStyles() {
            this._htmlElements.forEach(el => el.setCorrespondingStyles());
        }
        _handleMediaQuery() {
            window.addEventListener('resize', () => this._attachCorrespondingStyles());
        }
        _toggleChatSize() {
            this._chatState.toggleExpanded();
            this._attachCorrespondingStyles();
        }
        _appendElements() {
            this._htmlElements.forEach(el => el.addToDOM());
        }
    }
    exports.ChatWidget = ChatWidget;

})();

var __webpack_exports__ChatWidget = __webpack_exports__.ChatWidget;
var __webpack_exports___esModule = __webpack_exports__.__esModule;
export { __webpack_exports__ChatWidget as ChatWidget, __webpack_exports___esModule as __esModule };
