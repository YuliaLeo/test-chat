import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {of} from "rxjs";

@Component({
  selector: 'app-start-chat-form',
  templateUrl: './start-chat-form.component.html',
  styleUrls: ['./start-chat-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class StartChatFormComponent implements OnInit {
    @Output() public submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

    public chatForm!: FormGroup;

    public ngOnInit() {
        this.chatForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            question: new FormControl(null, Validators.required)
        });
    }

    public submit() {
        if (this.chatForm.valid) {
            of([]).subscribe(() => {
                this.submitted.emit(true);
            });
        }
    }
}
