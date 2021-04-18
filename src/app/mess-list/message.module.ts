import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { ConversationComponent } from "./conversation/conversation.component";
import { MessListComponent } from "./mess-list.component";
import { MessageRoutingModule } from "./message-routing.module";

@NgModule({
    declarations: [
        MessListComponent,
        ConversationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        MessageRoutingModule
    ]
})
export class MessageModule {}