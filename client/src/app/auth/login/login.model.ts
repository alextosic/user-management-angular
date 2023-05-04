export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  token?: string;
  verificationCodeRequired?: boolean;
  verificationType?: string;
}

export interface VerifyLoginRequestModel {
  email: string;
  password: string;
  verificationCode: string;
}
