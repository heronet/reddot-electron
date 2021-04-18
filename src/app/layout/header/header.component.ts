import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() buttonClicked = new EventEmitter<void>();

  userIsAuthenticated = false;
  username: string = "";
  usernameButton = true;
  searchBar = false;
  
  private authListenerSubs: Subscription = new Subscription;
  private nameListenerSubs: Subscription = new Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.username = this.authService.getUserName();
    this.nameListenerSubs = this.authService.getUserNameSub().subscribe(name => {
      this.username = name;
    });
    this.authListenerSubs =  this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.nameListenerSubs.unsubscribe();
  }
  onToggle() {
    this.buttonClicked.emit();
  }
  onProfileClick() {
    this.router.navigate(['/profile']);
  }
  onLogout() {
    this.authService.logoutUser();
  }
  search(form: NgForm) {
    this.router.navigate(['/search', form.value.search]);
  }

}
