import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/core/services';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string;
  @Input() inputType: string;
  @Input() control: FormControl;

  constructor(private alertService: AlertService) {}

  showErrors(): object {
    const { touched, errors } = this.control;

    return touched && errors;
  }
  cssClass(error): string {
    const defaultClasses = 'form-control';
    if (error) {
      const classes = ['form-control', 'border border-danger'];
      return classes.join(' ');
    }

    return defaultClasses;
  }
}
