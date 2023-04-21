export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserListResponseModel {
  users: Array<UserModel>;
  total: number;
}

export interface UserCreateModel {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}
