import {Injectable} from '@angular/core';
import {IChatConfig} from "../../interfaces/chat-config.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatState {
  public config: BehaviorSubject<IChatConfig | null> = new BehaviorSubject<IChatConfig | null>(null);
}
