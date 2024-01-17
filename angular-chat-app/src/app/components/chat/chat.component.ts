import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [FormsModule, NgFor]
})
export class ChatComponent {
  public newMessage: string = '';

  public messages: { author: string, timestamp: string, text: string }[] = [
    {
      author: 'Julius Caesar',
      timestamp: '12:44 pm',
      text: 'Thank you for contacting our online support center. How may I assist you today?'
    }
  ];

  public sendMessage() {
    if (this.newMessage.trim() !== '') {
      console.log(this.newMessage)
      this.messages.push({
        author: 'Current User',
        timestamp: new Date().toLocaleTimeString(),
        text: this.newMessage
      });
      this.newMessage = '';
    }
  }
}
