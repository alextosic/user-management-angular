import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cdp-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent {
  @Input() submitLabel = '';
  @Input() submitWidth: 'normal' | 'full' = 'normal';
  @Output('onSubmit') onSubmitEmitter = new EventEmitter<any>();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = {
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
    };

    this.onSubmitEmitter.emit(data);
  }
}
