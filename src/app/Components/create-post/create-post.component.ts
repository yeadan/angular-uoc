import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { HeaderMenuService } from 'src/app/Services/header-menu.service';
import { ImageService } from 'src/app/Services/image.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  description: string = '';
  public message: string = '';
  selectedFile: any = null;

  constructor(
    public userService: UserService,
    public router: Router,
    public headerMenuService: HeaderMenuService,
    public postservice: PostService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
  fileEvent(e: any) {
    this.selectedFile = e.target.files[0];
  }
  createImage(): void {
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    this.imageService.uploadImage(formData).subscribe({
      next: (data) => {
        this.createPost(data);
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }
  createPost(data: any): void {
    console.log(data);
    let user_id = data.user.id;
    let image_id = data.image.id;
    const post = new Post(
      this.title,
      this.description,
      true,
      user_id,
      image_id
    );
    this.postservice.addPost(post).subscribe({
      next: () => {
        this.router.navigateByUrl('home');
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }
}
