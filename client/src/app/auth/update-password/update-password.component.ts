import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'cdp-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class UpdatePasswordComponent {
  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const passwordResetToken = this.route.snapshot.paramMap.get('passwordResetToken');

    if (passwordResetToken) {
      this.authService.updatePassword(passwordResetToken, {
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
      }).subscribe();
    }
  }
}
