import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  users: any;
  currentUserName: string;
  authed: boolean;

  constructor(private userService: UserService, private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserName = this.authService.getUserName();
    this.router.params.subscribe(params => {
      this.userService.searchUsers(params.name).subscribe(res => {
        this.users = res;
        this.authed = this.authService.getAuthStatus();
      })
    });
  }
}
