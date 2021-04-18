import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './layout/body/search-result/search-result.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "create", component: CreatePostComponent, canActivate: [AuthGuard] },
  {path: "edit/:postId", component: CreatePostComponent, canActivate: [AuthGuard] },
  {path: "profile", component: ProfileComponent},
  {path: "search/:name", component: SearchResultComponent},
  //Lazy modules
  {path: "messages", loadChildren: () => import('./mess-list/message.module').then(m => m.MessageModule)},
  {path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
