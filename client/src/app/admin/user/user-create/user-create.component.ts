import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserCreateModel } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'cdp-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(data: UserCreateModel) {
    this.userService.createUser(data).subscribe(async () => {
      await this.router.navigate(['/admin/user']);
    });
  }

  async onCancel() {
    await this.router.navigate(['/admin/user']);
  }
}
