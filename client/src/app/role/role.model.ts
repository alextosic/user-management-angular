import { PermissionModel } from '../permission/permission.model';

export interface RoleModel {
  name: string;
  permissions: Array<PermissionModel>;
}

export interface RoleListResponseModel {
  roles: Array<RoleModel>;
  total: number;
}
