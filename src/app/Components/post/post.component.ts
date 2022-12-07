import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  private postId: string | null;
  post: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.postService.getPost(this.postId!).subscribe({
      next: (data) => {
        this.post = data;
        console.log(this.post);
      },
    });
  }
}
