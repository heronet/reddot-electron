import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  post_content: string = "";
  @Output() postCreated = new EventEmitter<any>();
  userAuthenticated: any = undefined;
  private authListenerSubs: Subscription = new Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getAuthStatus();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }
  onSubmit(form: NgForm) {
    this.postCreated.emit(form.form.value.post_content);
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
