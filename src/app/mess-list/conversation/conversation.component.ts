import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/models/Message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  recipientName: string;
  currentUserName: string;
  messages: Message[];
  msgSub: Subscription;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipientName = params.name;
      this.messageService.getConversation(this.recipientName).subscribe(mess => {
        this.messages = mess;
        this.currentUserName = this.authService.getUserName();
        this.msgSub = this.messageService.getMessage().subscribe((msg: Message) => {
          this.messages.push(msg);
        })
      });
    })
  }
  ngOnDestroy() {
    this.msgSub.unsubscribe();
  }

  sendMessage(f: NgForm) {
    
    const dto = {text: f.value.text, to: this.recipientName};
    f.reset();
    this.messageService.sendMessage(dto).subscribe(res => {
      // this.messages.push(res);
    });
  }
}
