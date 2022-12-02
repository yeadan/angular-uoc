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
  public loginValid = true;
  email: string = '';
  password: string = '';
  public message: string = '';

  constructor(
    public userService: UserService,
    public router: Router,
    public headerMenuService: HeaderMenuService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.loginValid = true;
    const user = { email: this.email, password: this.password };

    this.userService.login(user).subscribe({
      next: (data) => {
        console.log(data);
        this.userService.setToken(data.data.msg);
        this.loginValid = true;
        this.message = '';
        const headerInfo: HeaderMenu = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        // update options menu
        this.headerMenuService.headerManagement.next(headerInfo);
        //this.router.navigateByUrl('home');
      },
      error: (e) => {
        console.error('Error logging in', e);
        if (e.error) this.message = e.error.data.msg;
        else this.message = e.statusText;
      },
    });
  }
  /* actualUser(): void {
    this.userService.actualUser().subscribe((data) => {
      this.actual = data.name;
    });
  }*/
}
