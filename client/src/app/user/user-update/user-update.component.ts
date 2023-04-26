import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { UserModel, UserUpdateModel } from '../user.model';

@Component({
  selector: 'cdp-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['../../shared/form.styles.scss', './user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  userData: UserModel | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userService.getUser(id).subscribe((userData) => {
        this.userData = userData;
      });
    }
  }

  onSubmit(userData: UserUpdateModel) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userService.updateUser(id, userData).subscribe(async () => {
        await this.router.navigate(['/user']);
      });
    }
  }

  async onCancel() {
    await this.router.navigate(['/user']);
  }
}
