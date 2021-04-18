import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription = new Subscription;

  constructor(public authService: AuthService) { }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const user: User =  {
      name: form.form.value.name.trim(),
      username: form.form.value.username.trim().toLowerCase(),
      email: form.form.value.email.trim().toLowerCase(),
      password: form.form.value.password.trim(),
    };

    this.authService.createUser(user);
  }

}
