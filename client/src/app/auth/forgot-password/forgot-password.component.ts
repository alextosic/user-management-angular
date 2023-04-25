import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'cdp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.forgotPassword(form.value.email).subscribe();
  }
}
