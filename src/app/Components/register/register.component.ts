import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFail: boolean = false;
  message: string = '';
  form!: FormGroup;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.minLength(6)]),
    });
  }

  error(): void {
    setTimeout(() => {
      this.registerFail = false;
    }, 2000);
  }
  register(): void {
    if (this.form.valid) {
      this.validRegister();
    }
    this.registerFail = true;
    if (this.form.get('name')!.invalid) {
      this.message = 'El nombre debe tener un mínimo de 4 caracteres';
    } else if (this.form.get('email')!.invalid) {
      this.message = 'Email inválido';
    } else if (this.form.get('password')!.invalid) {
      this.message = 'La contraseña debe tener un mínimo de 6 caracteres';
    } else if (
      this.form.get('password')!.value !=
      this.form.get('passwordConfirm')!.value
    ) {
      this.message = 'Las contraseñas no coinciden';
    }
    this.error();
  }
  validRegister(): void {
    const user = {
      name: this.form.get('name')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
    };
    console.log(user);

    this.userService.register(user).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (e) => {
        console.error('Error logging in', e);
        this.registerFail = true;
        if (e.error) this.message = e.error.error;
        else this.message = e.statusText;
        this.error();
      },
    });
  }
}
