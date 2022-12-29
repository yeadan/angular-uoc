import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenu } from 'src/app/Models/header-menu';
import { HeaderMenuService } from 'src/app/Services/header-menu.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  public message: string = '';
  loginFail: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router,
    public headerMenuService: HeaderMenuService
  ) {}

  ngOnInit(): void {}

  login(): void {
    const user = { email: this.email, password: this.password };

    this.userService.login(user).subscribe({
      next: (user) => {
        console.log(user);
        this.userService.setToken(user.data.msg);
        this.message = '';
        const headerInfo: HeaderMenu = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        // update options menu
        this.headerMenuService.headerManagement.next(headerInfo);
        this.router.navigateByUrl('home');
      },
      error: (e) => {
        console.error('Error logging in', e);
        this.loginFail = true;
        if (e.error) this.message = e.error.error;
        else this.message = e.statusText;
        setTimeout(() => {
          this.loginFail = false;
        }, 2000);
      },
    });
  }
}
