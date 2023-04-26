import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { RoleModel } from '../role.model';
import { RoleService } from '../role.service';
import { UpdateRoleFormModel } from '../role.model';
import { PermissionModel } from '../../permission/permission.model';
import { PermissionService } from '../../permission/permission.service';

@Component({
  selector: 'cdp-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['../../shared/form.styles.scss', './role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit {
  permissionList: Array<PermissionModel> | undefined;
  roleData: RoleModel | undefined;
  updateForm: FormGroup | undefined

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.permissionService.getPermissionList().subscribe();

    this.permissionService.permissionListUpdated$.subscribe((permissionList) => {
      this.permissionList = permissionList;
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.roleService.getRole(id).subscribe((roleData) => {
        this.roleData = roleData;

        const updateFormData: UpdateRoleFormModel = {
          name: new FormControl(this.roleData?.name),
          permissions: new FormControl(this.roleData?.permissions.map((permission) => permission.id)),
        };

        this.updateForm = new FormGroup<any>(updateFormData);
      });
    }
  }

  onSubmit() {
    if (this.updateForm?.invalid) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    const roleData = {
      name: this.updateForm?.get('name')?.value,
      permissions: this.updateForm?.get('permissions')?.value,
    };

    if (id) {
      this.roleService.updateRole(id, roleData).subscribe(async () => {
        await this.router.navigate(['/role']);
      });
    }
  }

  async onCancel() {
    await this.router.navigate(['/role']);
  }
}
