import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";

interface IMessage {
  author: string;
  timestamp: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [FormsModule, NgFor]
})
export class ChatComponent {
    public newMessage: string = '';

    public messages: IMessage[] = [
        {
            author: 'Julius Caesar',
            timestamp: '12:44 pm',
            text: 'Thank you for contacting our online support center. How may I assist you today?'
        }
    ];

    public sendMessage() {
        if (this.newMessage.trim() !== '') {
            this.messages.push({
                author: 'Current User',
                timestamp: new Date().toLocaleTimeString(),
                text: this.newMessage
            });

            this.newMessage = '';
        }
    }
}
