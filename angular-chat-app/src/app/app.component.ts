import {Component, HostListener} from '@angular/core';
import {StartChatFormComponent} from "./components/start-chat-form/start-chat-form.component";
import {ChatState} from "./services/chat-state/chat.state";
import {IChatConfig} from "./interfaces/chat-config.interface";

const PARENT_ORIGIN = 'http://localhost:63342';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [StartChatFormComponent]
})
export class AppComponent{
  public config: IChatConfig | null = null;

  @HostListener('window:message', ['$event']) public onMessage(event: MessageEvent) {
    if (event.origin !== PARENT_ORIGIN) {
      return;
    }

    if (event.data.config) {
      this._chatState.config.next(event.data.config);
    }
  }

  constructor(
    private _chatState: ChatState
  ) {
  }
}
