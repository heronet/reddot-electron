import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { Post } from '../models/Post';

import { environment } from "../../environments/environment";
import { Socket } from "ngx-socket-io";

const BASE_URL = environment.apiUrl;

@Injectable({
    providedIn: "root"
})
export class PostService {
    private posts: any[] = [];
    private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

    constructor(private http: HttpClient, public authService: AuthService,  private router: Router, private socket: Socket) {}

    getPosts(postsPerPage: number, currentPage: number) {
        const params = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{success: boolean, data: Post[], count: number}>(`${BASE_URL}posts${params}`).subscribe(data => {
            this.posts = data.data;
            this.postsUpdated.next({posts: [...this.posts], postCount: data.count});
        });
    }

    getPostsByUserId(poster: any) {
        const params = `?userId=${poster}`;
        return this.http.get<{success: boolean, data: Post[], count: number}>(`${BASE_URL}posts${params}`);
    }
    getPost(id: any) {
        return {...this.posts.find(p => p._id === id)};
    }
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    createPost(data: {title: string, content: string, image: File}) {
        const postData = new FormData();
        postData.append("title", data.title);
        postData.append("content", data.content);
        postData.append("image", data.image, data.title);

        this.http.post<{}>(`${BASE_URL}posts`, postData).subscribe(res => {
            this.router.navigate(['/']);
        });
    }
    createPostWithRefresh(data: {title: string, content: string, image: any}) {
        return this.http.post<{}>(`${BASE_URL}posts`, data);
    }
    updatePost(id: any, data: {title: string, content: string, image: File | string}) {
        let postData;
        if(typeof(data.image) !== 'string') {
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", data.title);
            postData.append("content", data.content);
            postData.append("image", data.image, data.title);
        } else {
            postData = {
                ...data
            }
        }
        this.http.put<{}>(`${BASE_URL}posts/${id}`, postData).subscribe(res => {
            this.router.navigate(['/']);
        })
    }
    likePost(id: string) {
        return this.http.post<{success: boolean, likes: number}>(`${BASE_URL}posts/${id}/like`, {});
    }
    unlikePost(id: string) {
        return this.http.post<{success: boolean, likes: number}>(`${BASE_URL}posts/${id}/unlike`, {});
    }
    deletePost(id: string | undefined) {
        return this.http.delete(`${BASE_URL}posts/${id}`);
    }
    addComment(id: string, postData: any) {
        this.http.patch<{}>(`${BASE_URL}posts/${id}/comment`, postData).subscribe(res => {
            console.log(res);
            
        })
    }
    getUserLikes() {
        return this.http.get(`${BASE_URL}posts/users/likes`);
    }
    getLikesCount() {
        return this.socket.fromEvent('like');
    }
}