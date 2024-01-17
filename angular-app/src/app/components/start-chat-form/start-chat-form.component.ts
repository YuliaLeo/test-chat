import {Component, OnInit} from '@angular/core';
import {ChatState} from "../../services/chat-state/chat.state";
import {IChatConfig} from "../../interfaces/chat-config.interface";

@Component({
  selector: 'app-start-chat-form',
  templateUrl: './start-chat-form.component.html',
  styleUrls: ['./start-chat-form.component.scss'],
  standalone: true,
  imports: []
})
export class StartChatFormComponent implements OnInit {
  constructor(
    private _chatState: ChatState
  ) {
  }

  ngOnInit(): void {
    const el: HTMLElement | null = document.querySelector('.chat__start-btn');

    this._chatState.config.subscribe((value: IChatConfig | null) => {
      if (el && value) {
        el.style.backgroundColor = value.startChatBtnColor;
      }
    });
  }
}
