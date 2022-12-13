import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  name: string = '';
  email: string = '';
  password!: string | null;
  confirmPassword!: string | null;
  actual: any;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.userService.actualUser().subscribe({
      next: (data) => {
        this.actual = data;
        this.name = data.name;
        this.email = data.email;
        console.log(this.name, ' ', this.email);
      },
    });
  }
  updateUser(): void {
    let user: any;
    console.log('A ', this.name, this.email);

    if (this.password && this.password != this.confirmPassword) return;

    user = new User(this.name, this.email, this.password!);
    if (!this.password) delete user['password'];

    console.log(user);

    this.userService.updateUser(this.actual.id, user).subscribe(() => {
      this.router.navigateByUrl('/profile');
    });
  }
}
