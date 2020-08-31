import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService, UserService } from 'src/app/core/services';
import { Router } from '@angular/router';
const VALIDATION = {
  require: Validators.required,
  min: Validators.minLength(3),
  max: Validators.maxLength(20),
  paternUsername: Validators.pattern(/^[A-Za-z0-9]+$/i),
  paternPassword: Validators.pattern(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{3,20}$/),
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      VALIDATION.require,
      VALIDATION.min,
      VALIDATION.max,
      VALIDATION.paternUsername,
    ]),
    password: new FormControl('', [
      VALIDATION.require,
      VALIDATION.min,
      VALIDATION.max,
      VALIDATION.paternPassword,
    ]),
  });
  loading = false;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}
  onSubmit(): void {
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        this.alertService.sendMessage('login');
        this.loading = false;
        this.router.navigateByUrl('');
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
