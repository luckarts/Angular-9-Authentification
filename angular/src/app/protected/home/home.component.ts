import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, AlertService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const VALIDATION = {
  require: Validators.required,
  min: Validators.minLength(3),
  max: Validators.maxLength(20),
  paternUsername: Validators.pattern(/^[A-Za-z0-9]+$/i),
  paternPassword: Validators.pattern(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{3,20}$/),
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;
  user: User | null;
  updateForm = new FormGroup({
    password: new FormControl('', [
      VALIDATION.require,
      VALIDATION.min,
      VALIDATION.max,
      VALIDATION.paternPassword,
    ]),
  });
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.user = this.userService.userValue;
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }
    this.userService.update(this.updateForm.value).subscribe({
      next: (response) => {
        this.alertService.sendMessage('you are register');
      },
      error: (err) => {
        if (err.status === 404 || err.status === 0) {
          this.alertService.sendMessage(err.statusText);
        } else {
          if (err.error.error.email) {
            this.alertService.sendMessage(err.error.error.email);
          }
          if (err.error.error.password) {
            this.alertService.sendMessage(err.error.error.password);
          }
        }
      },
    });
  }
}
