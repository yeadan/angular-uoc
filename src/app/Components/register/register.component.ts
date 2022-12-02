import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(public userService: UserService, public router: Router) {}

  register() {
    if (this.password != this.confirmPassword) return;

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.userService.register(user).subscribe((data) => {
      console.log(data);
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/');
    });
  }
}
