export interface ProfileModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface ProfileUpdateModel {
  firstName: string;
  lastName: string;
}
