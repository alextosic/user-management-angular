import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RoleService } from '../role.service';
import { PermissionService } from '../../permission/permission.service';
import { PermissionModel } from '../../permission/permission.model';

@Component({
  selector: 'cdp-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['../../shared/form.styles.scss', './role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit {
  permissionList: Array<PermissionModel> | undefined;

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.permissionService.getPermissionList().subscribe();

    this.permissionService.permissionListUpdated$.subscribe((permissionList) => {
      this.permissionList = permissionList;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = {
      name: form.value.name.toUpperCase(),
      permissions: form.value.permissions,
    };

    this.roleService.createRole(data).subscribe(async () => {
      await this.router.navigate(['/role']);
    });
  }

  async onCancel() {
    await this.router.navigate(['/role']);
  }
}
