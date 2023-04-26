export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  immutable: boolean;
}

export interface UserListResponseModel {
  users: Array<UserModel>;
  total: number;
}

export interface UserCreateModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface UserUpdateModel {
  firstName: string;
  lastName: string;
  password?: string;
  confirmPassword?: string;
}
