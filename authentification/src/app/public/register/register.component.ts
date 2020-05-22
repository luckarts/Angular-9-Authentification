import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, AlertService } from 'src/app/core/services';

import { Router } from '@angular/router';

const VALIDATION = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^[a-z0-9]+$/),
];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', VALIDATION),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', VALIDATION),
  });
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.signUp(this.registerForm.value).subscribe({
      next: () => {
        this.alertService.sendMessage('you are register');
        this.router.navigateByUrl('');
      },
    });
  }
}
