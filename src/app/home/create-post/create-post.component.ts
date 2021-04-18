import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../post.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  private mode = 'create';
  private postId: string | null = '';
  post: any;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      // 'image': new FormControl(null, {asyncValidators: [mimeType]})
      'image': new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
        if(this.post.imagePath) {
          this.form.setValue({'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath});
        } else {
          this.form.setValue({'title': this.post.title, 'content': this.post.content, 'image': " "});
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onImageSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      if(this.mode === "create")
        this.postService.createPost(this.form.value);
      if(this.mode === "edit")
        this.postService.updatePost(this.postId, this.form.value);
    }
    
  }
}
