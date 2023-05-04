import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cdp-mfa-verify',
  templateUrl: './mfa-verify.component.html',
  styleUrls: ['../../shared/form.styles.scss'],
})
export class MfaVerifyComponent {
  @Input() showCancel: boolean = false;
  @Output() cdpSubmit = new EventEmitter<any>();
  @Output() cdpCancel = new EventEmitter<any>();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.cdpSubmit.emit(form.value.verificationCode);
  }

  onCancel() {
    this.cdpCancel.emit();
  }
}
