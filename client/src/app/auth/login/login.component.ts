import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'cdp-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  verifyingCode: boolean = false;
  verificationType: string | undefined = '';

  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = {
      email: form.value.email,
      password: form.value.password,
    };

    this.authService.login(data).subscribe((loginData) => {
      if (loginData?.verificationCodeRequired) {
        this.verifyingCode = true;
        this.verificationType = loginData.verificationType;
      }
    });
  }

  onVerify(verificationCode: string) {
    this.authService.verifyLogin(this.verificationType, verificationCode).subscribe();
  }
}
