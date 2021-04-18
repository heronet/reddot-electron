import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Message } from '../models/Message';
import { UserService } from '../user.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-mess-list',
  templateUrl: './mess-list.component.html',
  styleUrls: ['./mess-list.component.css']
})
export class MessListComponent implements OnInit {
  receivedNames: string[];
  inbox: {name: string, message: Message};
  username: string;

  constructor(private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.messageService.getInbox().subscribe(res => {
      this.username = this.authService.getUserName();
      this.receivedNames = Object.keys(res);
      this.inbox = res;
    })
  }

}
