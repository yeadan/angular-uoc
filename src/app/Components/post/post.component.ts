import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/Services/comment.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  private postId: string | null;
  post: any;
  comments: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.postId);
  }
  ngOnInit(): void {
    this.postService.getPost(this.postId!).subscribe({
      next: (data) => {
        this.post = data;
        console.log(this.post);
      },
    });
    this.commentService.postComments(this.postId!).subscribe({
      next: (data) => {
        this.comments = data;
        console.log(this.comments);
      },
    });
  }
}
