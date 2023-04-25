export interface ProfileModel {
  email: string;
  firstName: string;
  lastName: string;
  role: {
    name: string;
    permissions: Array<{
      name: string;
    }>;
  };
}

export interface ProfileUpdateModel {
  firstName: string;
  lastName: string;
}
