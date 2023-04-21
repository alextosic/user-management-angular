import { Component } from '@angular/core';

import { UserCreateModel } from '../user.model';

@Component({
  selector: 'cdp-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  onSubmit(data: UserCreateModel) {}
}
