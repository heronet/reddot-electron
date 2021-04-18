import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ConversationComponent } from "./conversation/conversation.component";
import { MessListComponent } from "./mess-list.component";

const routes: Routes = [
  {
    path: "", 
    canActivate: [AuthGuard],
    children: [
      {path: "", component: MessListComponent},
      {path: "conversation/:name", component: ConversationComponent}
    ]
  }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MessageRoutingModule {}