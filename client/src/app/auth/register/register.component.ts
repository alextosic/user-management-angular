import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { RegisterRequestModel } from './register.model';

@Component({
  selector: 'cdp-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onSubmit(data: RegisterRequestModel) {
    this.authService.register(data).subscribe();
  }
}
