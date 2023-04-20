import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'cdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.styles.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

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

    this.authService.register(data)
      .subscribe(async () => {
        await this.router.navigate(['/login']);
      });
  }
}
