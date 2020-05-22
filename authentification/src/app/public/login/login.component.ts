import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService, UserService } from 'src/app/core/services';
import { Router } from '@angular/router';
const VALIDATION = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^[a-z0-9]+$/),
];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', VALIDATION),
    password: new FormControl('', VALIDATION),
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
