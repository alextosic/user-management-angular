export interface ProfileModel {
  email: string;
  firstName: string;
  lastName: string;
  permissions: Array<string>;
}

export interface ProfileUpdateModel {
  firstName: string;
  lastName: string;
}
