import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnDestroy {
  @Input() post: any;
  @Input() postDeletable = false;
  @Input() userId: any;
  @Input() username: any;
  @Input() postLiked = false;

  panelOpenState = false;
  likesCount: number;
  

  comments: [{author: string, opinion: string}];
  
  @Output() postDeleted = new EventEmitter<any>();
  @Output() commentCreated = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private postService: PostService) { }

  ngOnInit(): void {
    this.comments = this.post.comments;
    this.likesCount = this.post.likes.length;
  }

  ngOnDestroy() {
  }
  newComment(form: NgForm) {
    if(this.username) {
      let comment = {author: this.username, opinion: form.value.comment};
      this.comments.push(comment);
      this.post.comments = this.comments;
      this.commentCreated.emit(this.post);
    }
  }
  likePost() {
    this.postService.likePost(this.post._id).subscribe(res => {
      this.postLiked = true;
      this.likesCount = res.likes;
    });
  }
  unlikePost() {
    this.postService.unlikePost(this.post._id).subscribe(res => {
      this.postLiked = false;
      this.likesCount = res.likes;
    })
  }
  deletePost() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res)
        this.postDeleted.emit(this.post._id);
    });
  }
}
