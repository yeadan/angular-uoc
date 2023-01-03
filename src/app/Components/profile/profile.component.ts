import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  actual: any;
  updateFail: boolean = false;
  message: string = '';
  form!: FormGroup;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
    });

    this.userService.actualUser().subscribe({
      next: (data) => {
        this.actual = data;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['email'].setValue(data.email);
      },
    });
  }

  error(): void {
    setTimeout(() => {
      this.updateFail = false;
    }, 2000);
  }

  updateUser(): void {
    if (this.form.valid) {
      this.validUpdate();
    }
    this.updateFail = true;
    if (this.form.get('name')!.invalid) {
      this.message = 'El nombre debe tener un mínimo de 4 caracteres';
    } else if (this.form.get('email')!.invalid) {
      this.message = 'Email inválido';
    } else if (
      this.form.get('password')!.value !=
      this.form.get('passwordConfirm')!.value
    ) {
      this.message = 'Las contraseñas no coinciden';
    }
    this.error();
  }

  validUpdate(): void {
    let user: any;

    user = new User(
      this.form.get('name')!.value,
      this.form.get('email')!.value,
      this.form.get('password')!.value
    );
    if (!this.form.get('password')!.value) delete user['password'];

    console.log(user);

    this.userService.updateUser(this.actual.id, user).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (e) => {
        this.updateFail = true;
        if (e.error) this.message = e.error.error;
        else this.message = e.statusText;
        this.error();
      },
    });
  }
}
