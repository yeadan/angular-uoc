import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/Services/comment.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  Posts: any;
  Comments: any;
  actual: any;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.actualUser().subscribe({
      next: (user) => {
        this.actual = user;
      },
    });
    this.postService.listPostReported().subscribe({
      next: (data) => {
        this.Posts = data;
        console.log(this.Posts);
      },
    });
    this.commentService.listCommentsReported().subscribe({
      next: (data) => {
        this.Comments = data;
      },
    });
  }
  goPost(id: string): void {
    this.router.navigateByUrl('/post/' + id);
  }
}
