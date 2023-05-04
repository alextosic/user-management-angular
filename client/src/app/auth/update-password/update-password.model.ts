export interface UpdatePasswordRequestModel {
  password: string;
  confirmPassword: string;
  passwordResetToken: string;
}
