import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, AlertService } from 'src/app/core/services';

import { Router } from '@angular/router';

const VALIDATION = {
  require: Validators.required,
  min: Validators.minLength(3),
  max: Validators.maxLength(20),
  paternUsername: Validators.pattern(/^[A-Za-z0-9]+$/i),
  paternPassword: Validators.pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
  paternEmail: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [
      VALIDATION.require,
      VALIDATION.min,
      VALIDATION.max,
      VALIDATION.paternUsername,
    ]),
  });
  loading = false;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService
      .signUp({ ...this.registerForm.value, password: 'Password0%', email: 'test@test.com' })
      .subscribe({
        next: () => {
          this.alertService.sendMessage('you are register');
          this.router.navigateByUrl('');
        },
      });
  }
}
