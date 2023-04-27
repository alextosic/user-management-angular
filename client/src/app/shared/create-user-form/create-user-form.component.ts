import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RegisterRequestModel } from '../../auth/register/register.model';
import { UserCreateModel } from '../../user/user.model';
import { RoleModel } from '../../role/role.model';
import { RoleService } from '../../role/role.service';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'cdp-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['../form.styles.scss'],
})
export class CreateUserFormComponent implements OnInit {
  @Input() page: 'register' | 'createUser' = 'register';
  @Output() cdpSubmit = new EventEmitter<any>();
  @Output() cdpCancel = new EventEmitter<any>();

  roleList: Array<RoleModel> | undefined;

  constructor(private roleService: RoleService, private profileService: ProfileService) {}

  ngOnInit() {
    if (
      this.page === 'createUser' &&
      this.profileService.profileHasPermissions(['list_roles'])
    ) {
      this.roleService.getRoleList().subscribe();

      this.roleService.roleListUpdated$.subscribe((roleList) => {
        this.roleList = roleList;
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let data: RegisterRequestModel | UserCreateModel = {
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
    };

    if (this.page === 'createUser') {
      data = {
        ...data,
        role: form.value.role,
      } as UserCreateModel;
    }

    this.cdpSubmit.emit(data);
  }

  onCancel() {
    this.cdpCancel.emit();
  }
}
