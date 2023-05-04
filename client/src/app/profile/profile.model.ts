import { MfaModel } from './mfa/mfa.model';

export interface ProfileModel {
  email: string;
  firstName: string;
  lastName: string;
  permissions: Array<string>;
  mfa?: MfaModel;
}

export interface ProfileUpdateModel {
  firstName: string;
  lastName: string;
}
