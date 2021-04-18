import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "../models/User";

import { environment } from "src/environments/environment";

const BASE_URL=`${environment.apiUrl}users/`

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private token: string | null = "";
    // private tokenTimer: any;
    private isAuthenticated = false;
    private userId: any = "";
    private username: any = "";
    private authStatusListener = new Subject<boolean>();
    private nameStatusListener = new Subject<any>();

    constructor(public http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getAuthStatus() {
        return this.isAuthenticated;
    }
    getUserId() {
        return this.userId;
    }
    getUserNameSub() {
        return this.nameStatusListener.asObservable();
    }
    getUserName() {
        return this.username;
    }

    createUser(user: User) {
        this.http.post<{token: string, userId: string, username: string}>(BASE_URL + "signup", user).subscribe(res => {
            this.token = res.token;
            if(this.token) {
                // const expiresInDuration = res.expiresIn;
                // this.setAuthTimer(expiresInDuration);
                this.authStatusListener.next(true);
                this.isAuthenticated = true;
                this.userId = res.userId;
                this.username = res.username;
                this.nameStatusListener.next(res.username);
                const now = new Date();
                // const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(this.token, this.userId, res.username);
                this.router.navigate(['/']);
            }
        }, error => {
            this.authStatusListener.next(false);
        });
    }
    loginUser(data: {email: string, password: string}) {
        this.http.post<{token: string, userId: string, username: string}>(BASE_URL + "login", data).subscribe(res => {
            this.token = res.token;
            if(this.token) {
                // const expiresInDuration = res.expiresIn;
                // this.setAuthTimer(expiresInDuration);
                this.authStatusListener.next(true);
                this.isAuthenticated = true;
                this.userId = res.userId;
                this.username = res.username;
                this.nameStatusListener.next(res.username);
                const now = new Date();
                // const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(this.token, this.userId, res.username);
                this.router.navigate(['/']);
            }
        }, error => {
            this.authStatusListener.next(false);
        });
    }
    autoAuthUser() {
        const authInformation: any = this.getAuthData();
        if(!authInformation) return;
        // const now = new Date();
        // const expiresIn: any = authInformation?.expirationDate.getTime() - now.getTime();
        // if(expiresIn > 0) {
            this.token = authInformation.token;
            this.userId = authInformation.userId;
            this.username = authInformation.username;
            this.nameStatusListener.next(this.username);
            this.isAuthenticated = true;
            // this.setAuthTimer(expiresIn);
            this.authStatusListener.next(true);
        // }
    }
    logoutUser() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        // clearInterval(this.tokenTimer);
        this.clearAuthData();
        this.userId = null;
        this.username = null;
        this.nameStatusListener.next(this.username);
        this.router.navigate(['/']);
    }
    private saveAuthData(token: string, userId: any, username: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        // localStorage.setItem('expiration', expirationDate.toISOString());
    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        this.nameStatusListener.next("");
    }
    private getAuthData() {
        const token  = localStorage.getItem("token");
        // const expirationDate  = localStorage.getItem("expiration");
        const userId  = localStorage.getItem("userId");
        const username  = localStorage.getItem("username");
        this.nameStatusListener.next(username);
        if(!token) {
            return null;
        }
        return {
            token: token, userId: userId, username
            // token: token, expirationDate: new Date(expirationDate), userId: userId, username
        }
    }
    // private setAuthTimer(duration: number) {
    //     this.tokenTimer = setTimeout(() => {
    //         this.logoutUser();
    //     }, duration * 1000);
    // }
}