import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/Models/comment';
import { Post } from 'src/app/Models/post';
import { CommentService } from 'src/app/Services/comment.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  activeComment: any = -1;
  activePost: boolean = false;
  private postId: string | null;
  post: any;
  comments: any;
  actual: number = 0;
  form!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
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
    this.userService.actualUser().subscribe({
      next: (user) => {
        this.actual = user.id;
      },
    });
  }

  isEditing(id: number, data: string): void {
    if (data === 'comment') {
      if (this.activeComment != id) this.activeComment = id;
      else this.activeComment = -1;
    }
    if (data === 'post') this.activePost = !this.activePost;
  }
  delete(comment: any, index: number): void {
    this.commentService.deleteComment(comment).subscribe({
      next: () => {
        this.comments.splice(index, 1);
      },
    });
  }
  updateComment(text: string, comment: any): void {
    comment.content = text;
    console.log(comment);
    this.commentService.updateComment(comment, comment.id).subscribe({
      next: (data) => {
        this.activeComment = -1;
        console.log('updated! ', data);
      },
    });
  }
  reportComment(report: any, index: number): void {
    let upComment: Comment = report.data;
    upComment.reported = true;
    upComment.content = report.data.content;
    upComment.reported_by = this.actual;
    console.log(upComment);
    this.commentService.updateComment(upComment, upComment.id!).subscribe({
      next: () => {
        this.comments[index] = report;
      },
    });
  }
  createComment(text: string, id: number): void {
    let comment = new Comment(text, this.actual, id);
    this.commentService.createComment(comment).subscribe({
      next: (data) => {
        this.activePost = false;
        this.comments.push(data);
      },
    });
  }
  reportPost(report: any): void {
    let upPost: Post = report.data;
    upPost.reported = true;
    upPost.reported_by = this.actual;
    this.postService.editPost(upPost, upPost.id!).subscribe({
      next: () => {
        console.log(upPost);
      },
    });
  }
}
