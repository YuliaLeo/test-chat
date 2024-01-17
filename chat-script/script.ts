export class ChatWidget {
    private _chatFrame: HTMLIFrameElement | null = null;

    private _chatButton: HTMLButtonElement | null = null;

    private _targetOrigin: string = '';

    private isExpanded: boolean = false;

    constructor(
        key: string,
        appendDefaultButtonAfter: HTMLElement | null = null,
        customButtonTemplate: HTMLElement | null = null,
        customStyles: { [key: string]: string } | null = null
    ) {
        this._targetOrigin = key;

        this._createChatFrame();
        this._sendMessageOnLoad(customStyles);

        if (!customButtonTemplate) {
            this._createChatButton(appendDefaultButtonAfter);
        } else {
            customButtonTemplate.addEventListener('click', () => this._toggleChatSize());
        }
    }

    public show() {
        if (!this._chatFrame) {
            return;
        }

        document.body.appendChild(this._chatFrame);
    }

    private _createChatFrame() {
        this._chatFrame = document.createElement('iframe');
        this._chatFrame.id = 'chat-frame';
        this._chatFrame.src = this._targetOrigin;
        this._chatFrame.style.height = '590px';
    }

    private _sendMessageOnLoad(message: any) {
        if (this._chatFrame) {
            this._chatFrame.addEventListener('load', () => {
                if (this._chatFrame?.contentWindow) {
                    this._chatFrame.contentWindow.postMessage(message, this._targetOrigin);
                }
            });
        }
    }

    private _createChatButton(appendDefaultButtonAfter: HTMLElement | null) {
        this._chatButton = document.createElement('button');
        this._chatButton.innerHTML = 'Start chat';
        this._chatButton.style.width = '100px';
        this._chatButton.style.height = '50px';
        this._chatButton.style.backgroundColor = 'green';
        this._chatButton.style.color = 'white';
        this._chatButton.addEventListener('click', () => this._toggleChatSize());
        appendDefaultButtonAfter ?
            appendDefaultButtonAfter.after(this._chatButton) :
            document.body.appendChild(this._chatButton);
    }

    private _toggleChatSize() {
        if (!this._chatFrame) {
            return;
        }

        if (!document.getElementById('chat-frame')) {
            this.show();
            this.isExpanded = true;
            return;
        }

        if (this.isExpanded) {
            this._chatFrame.style.display = 'none';
            this._chatFrame.style.visibility = 'hidden';
        } else {
            this._chatFrame.style.display = 'block';
            this._chatFrame.style.visibility = 'visible';
        }

        this.isExpanded = !this.isExpanded;
    }
}