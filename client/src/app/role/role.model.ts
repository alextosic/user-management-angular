import { FormControl } from '@angular/forms';

import { PermissionModel } from '../permission/permission.model';

export interface RoleModel {
  name: string;
  immutable: boolean;
  permissions: Array<PermissionModel>;
}

export interface RoleCreateModel {
  name: string;
  permissions: Array<string>;
}

export interface RoleUpdateModel {
  name: string;
  permissions: Array<string>;
}

export interface RoleListResponseModel {
  roles: Array<RoleModel>;
  total: number;
}

export interface UpdateRoleFormModel {
  name: FormControl<string | null | undefined>,
  permissions: FormControl<Array<string> | null | undefined>,
}
