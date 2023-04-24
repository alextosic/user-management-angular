import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ProfileModel } from '../../home/profile/profile.model';
import { UserModel } from '../../admin/user/user.model';
import { UpdateFormModel } from './update-form.model';

@Component({
  selector: 'cdp-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
})
export class UpdateFormComponent implements OnInit {
  @Input() updateData: ProfileModel | UserModel | undefined = undefined;
  @Input() page: 'profile' | 'updateUser' = 'profile';

  @Output() cdpSubmit = new EventEmitter<any>();
  @Output() cdpCancel = new EventEmitter<any>();

  updateForm: FormGroup | undefined = undefined;
  editable = false;

  ngOnInit() {
    const updateFormData: UpdateFormModel = {
      email: new FormControl(this.updateData?.email),
      firstName: new FormControl(this.updateData?.firstName),
      lastName: new FormControl(this.updateData?.lastName),
    };

    this.updateForm = new FormGroup<any>(updateFormData);
    this.disableEdit();
  }

  enableEdit() {
    this.editable = true;

    if (this.page === 'profile') {
      this.updateForm?.get('firstName')?.enable();
      this.updateForm?.get('lastName')?.enable();
    } else {
      this.updateForm?.addControl('password', new FormControl(''));
      this.updateForm?.addControl('confirmPassword', new FormControl(''));
    }
  }

  disableEdit() {
    this.editable = false;
    this.updateForm?.get('email')?.disable();

    if (this.page === 'profile') {
      this.updateForm?.get('firstName')?.disable();
      this.updateForm?.get('lastName')?.disable();
    } else {
      this.updateForm?.removeControl('password');
      this.updateForm?.removeControl('confirmPassword');
    }
  }

  onSubmit() {
    if (this.updateForm?.invalid) {
      return;
    }

    this.disableEdit();

    this.cdpSubmit.emit({
      firstName: this.updateForm?.get('firstName')?.value,
      lastName: this.updateForm?.get('lastName')?.value,
      password: this.page === 'updateUser' && this.editable
        ? this.updateForm?.get('password')?.value
        : undefined,
      confirmPassword: this.page === 'updateUser' && this.editable
        ? this.updateForm?.get('confirmPassword')?.value
        : undefined,
    });
  }

  onCancel() {
    this.cdpCancel.emit();
  }
}
