import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AlertService } from 'src/app/core/services';

interface UserModel {
  id: number;
  username: object;
  email: string;
  password: string;
  permission_id: number;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}
  updateForm: FormGroup;
  user;
  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;

    this.updateForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl('', Validators.required),
    });
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
