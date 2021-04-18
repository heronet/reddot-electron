import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { PostService } from 'src/app/home/post.service';

@Component({
  selector: 'app-personal-posts',
  templateUrl: './personal-posts.component.html',
  styleUrls: ['./personal-posts.component.css']
})
export class PersonalPostsComponent implements OnInit {
  @Input() username: any;
  @Input() userId: any;
  posts: any;
  showSpinner: boolean | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostsByUserId(this.userId).subscribe(data => {
      this.posts = data.data;
    });
  }
  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPostsByUserId(this.userId).subscribe(data => {
        this.posts = data.data;
      });
    }, () => {
      this.showSpinner = false;
    });
  }

}
