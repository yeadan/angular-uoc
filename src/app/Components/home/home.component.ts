import { Component } from '@angular/core';

import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Posts: any;

  constructor(
    private postService: PostService,
    public userService: UserService
  ) {}
  ngOnInit(): void {
    this.postService.listPost().subscribe({
      next: (data) => {
        this.Posts = data;
        console.log(this.Posts);
      },
    });
  }
  /* search(id: number): void {
    this.subs = this.userService
      .getUser(id)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log(data.data);
          this.name = data.data.name;
          console.log(this.name);
        },
      });

    //this.subs.unsubscribe();
  }*/
}
