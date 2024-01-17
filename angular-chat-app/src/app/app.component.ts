import {Component, HostListener} from '@angular/core';
import {StartChatFormComponent} from "./components/start-chat-form/start-chat-form.component";
import {ChatComponent} from "./components/chat/chat.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";

const PARENT_ORIGIN = 'http://localhost:63342';

enum Step {
  StartChatForm = 'StartChatForm',
  Chat = 'Chat'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [StartChatFormComponent, ChatComponent, NgSwitch, NgSwitchCase]
})
export class AppComponent {
  @HostListener('window:message', ['$event']) public onMessage(event: MessageEvent) {
    if (event.origin !== PARENT_ORIGIN) {
      return;
    }

    if (event.data?.customStyles) {
      this._applyCustomStyles(event.data.customStyles);
    }
  }

  public step: Step = Step.StartChatForm;

  public Step = Step;

  private _applyCustomStyles(customStyles: Record<string, string>) {
    Object.keys(customStyles).forEach(key => {
      document.documentElement.style.setProperty(key, customStyles[key]);
    });
  }
}
