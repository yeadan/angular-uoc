import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/Models/comment';
import { Like } from 'src/app/Models/like';
import { Post } from 'src/app/Models/post';
import { CommentService } from 'src/app/Services/comment.service';
import { LikeService } from 'src/app/Services/like.service';
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
  activeMain: boolean = false;
  isLiked: boolean = false;
  private postId: string | null;
  post: any;
  comments: any;
  actual: any;
  form!: FormGroup;
  likes: any;
  actualLike: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private likeService: LikeService,
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
        this.actual = user;
      },
    });
    this.likeService.postLikes(this.postId!).subscribe({
      next: (data) => {
        this.likes = data;
      },
    });
  }
  testLike(): boolean {
    let mylike = this.likes.find(
      (e: { user_id: number }) => e.user_id === this.actual.id
    );
    if (mylike) {
      this.actualLike = mylike;
      return true;
    } else return false;
  }
  deleteLike() {
    this.likeService.deleteLike(this.actualLike.id).subscribe({
      next: () => {
        this.likes.splice(this.actualLike, 1);
        this.post.data.num_likes -= 1;
      },
    });
  }
  createLike() {
    let dataLike = new Like(this.actual.id, this.post.data.id);
    this.likeService.createLike(dataLike).subscribe({
      next: (data) => {
        this.actualLike = data.data;
        this.likes.push(this.actualLike);
        this.post.data.num_likes += 1;
      },
    });
  }

  isEditing(id: number, data: string): void {
    if (data === 'comment') {
      if (this.activeComment != id) this.activeComment = id;
      else this.activeComment = -1;
    }
    if (data === 'post') this.activePost = !this.activePost;
    if (data == 'main') this.activeMain = !this.activeMain;
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
  updatePost(content: any, post: any): void {
    post.title = content.title;
    post.description = content.description;
    this.postService.editPost(post, post.id).subscribe({
      next: (data) => {
        this.activeMain = false;
        console.log('updated! ', data);
      },
    });
  }
  reportComment(report: any, index: number): void {
    let upComment: Comment = report.data;
    upComment.reported = true;
    upComment.content = report.data.content;
    upComment.reported_by = this.actual.id;
    console.log(upComment);
    this.commentService.updateComment(upComment, upComment.id!).subscribe({
      next: () => {
        this.comments[index] = report;
      },
    });
  }
  createComment(text: string, id: number): void {
    let comment = new Comment(text, this.actual.id, id);
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
    upPost.reported_by = this.actual.id;
    this.postService.editPost(upPost, upPost.id!).subscribe({
      next: () => {
        console.log(upPost);
      },
    });
  }
}
