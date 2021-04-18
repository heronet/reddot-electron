import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './home/post/post.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { StatusComponent } from './home/status/status.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalPostsComponent } from './profile/personal-posts/personal-posts.component';
import { DeleteDialogComponent } from './home/post/delete-dialog/delete-dialog.component';
import { SearchResultComponent } from './layout/body/search-result/search-result.component';
import { environment } from 'src/environments/environment';
import { LoadingPostComponent } from './layout/loading-post/loading-post.component';

const BASE_URL = environment.socketUrl;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    CreatePostComponent,
    ErrorComponent,
    StatusComponent,
    ProfileComponent,
    PersonalPostsComponent,
    DeleteDialogComponent,
    SearchResultComponent,
    LoadingPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({url: BASE_URL}),
    NgxSkeletonLoaderModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
