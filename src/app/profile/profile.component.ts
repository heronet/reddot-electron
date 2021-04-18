import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  userId: any;
  table: any;
  userData: any;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
      this.userId = this.authService.getUserId();
      this.userService.getUser(this.userId).subscribe(user => {
        this.user = user;
        this.userData = {
          "Username": this.user.username,
          "Name": this.user.name,
          "E-mail": this.user.email,
        }
      });
  }
  ngOnDestroy() {
  }
  resetTable(table: any) {
    this.table = table;
    console.log(table);
  }
  addHobby(form: NgForm) {
    this.user.hobbies.push(form.value.new_hobby);
    this.userService.updateUser(this.userId, this.user).subscribe(res => {
      console.log(res);
      this.table.renderRows();
    });
  }
}
