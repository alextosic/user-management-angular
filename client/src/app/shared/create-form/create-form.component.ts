import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cdp-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent {
  @Input() page: 'register' | 'createUser' = 'register';
  @Output() cdpSubmit = new EventEmitter<any>();
  @Output() cdpCancel = new EventEmitter<any>();

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

    this.cdpSubmit.emit(data);
  }

  onCancel() {
    this.cdpCancel.emit();
  }
}
