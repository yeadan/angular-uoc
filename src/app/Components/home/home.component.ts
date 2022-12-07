import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Posts: any;

  constructor(private postService: PostService, private router: Router) {}
  ngOnInit(): void {
    this.postService.listPost().subscribe({
      next: (data) => {
        this.Posts = data;
        console.log(this.Posts);
      },
    });
  }
  goPost(id: string): void {
    this.router.navigateByUrl('/post/' + id);
  }
}
