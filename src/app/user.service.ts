import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { User } from "./models/User";

const BASE_URL = environment.apiUrl;

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient,  private router: Router) {

    }
    getUser(id: any) {
        return this.http.get<{data: any}>(`${BASE_URL}users/${id}`);
    }
    updateUser(id: any, data: User) {
        return this.http.put<{data: any}>(`${BASE_URL}users/${id}`, data);
    }
    searchUsers(name: string) {
        return this.http.get<[{}]>(`${BASE_URL}users?search=${name}`);
    }
}