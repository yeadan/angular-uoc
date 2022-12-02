import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  actual: string = '';
  public message: string = '';

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    if (this.userService.getToken()) {
      this.actual = 'Cargando...';
      this.actualUser();
    }
  }

  login(): void {
    this.loginValid = true;
    const user = { email: this.email, password: this.password };

    this.userService.login(user).subscribe({
      next: (data) => {
        console.log(data);
        this.userService.setToken(data.data.msg);
        this.loginValid = true;
        this.message = '';
        this.actualUser();
      },
      error: (e) => {
        console.error('Error logging in', e);
        if (e.error) this.message = e.error.data.msg;
        else this.message = e.statusText;
      },
    });
  }
  logout(): void {
    this.actual = '';
    this.userService.logout();
  }
  actualUser(): void {
    this.userService.actualUser().subscribe((data) => {
      this.actual = data.name;
    });
  }
}
