import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { RegisterRequestModel } from './register/register.model';
import { ProfileService } from '../profile/profile.service';
import { ForgotPasswordResponseModel } from './forgot-password/forgot-password.model';
import { UpdatePasswordRequestModel } from './update-password/update-password.model';

import {
  LoginRequestModel,
  LoginResponseModel,
  VerifyLoginRequestModel
} from './login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private apiUrl = `${environment.apiUrl}/auth`;
  private email = '';
  private password = '';

  constructor(private httpClient: HttpClient, private router: Router, private profileService: ProfileService) {}

  getToken() {
    if (!this.token) {
      this.loadToken();
    }

    return this.token;
  }

  loadToken() {
    this.token = localStorage.getItem('cyrillic-demo-user-token') || '';
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('cyrillic-demo-user-token', token);
  }

  deleteToken() {
    this.token = '';
    localStorage.removeItem('cyrillic-demo-user-token');
  }

  login(data: LoginRequestModel) {
    const url = `${this.apiUrl}/login`;

    return this.httpClient.post<HttpResponseModel<LoginResponseModel>>(url, data)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: async (responseData) => {
            if (responseData?.token) {
              this.saveToken(responseData.token);
              await this.router.navigate(['/']);
            } else if (responseData?.verificationCodeRequired) {
              this.email = data.email;
              this.password = data.password;
            }

            return responseData;
          },
        })
      );
  }

  verifyLogin(type: string = '', verificationCode: string) {
    const url = `${this.apiUrl}/verify`;
    const body = { email: this.email, password: this.password, verificationCode };
    const options = { params: new HttpParams({ fromObject: { type } }) };

    return this.httpClient.post<HttpResponseModel<LoginResponseModel>>(url, body, options)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: async (responseData) => {
            if (responseData?.token) {
              this.email = '';
              this.password = '';
              this.saveToken(responseData.token);

              await this.router.navigate(['/']);
            }
          },
        })
      );
  }

  register(data: RegisterRequestModel) {
    const url = `${this.apiUrl}/register`;
    return this.httpClient.post<HttpResponseModel<any>>(url, data)
      .pipe(
        tap({
          next: async () => {
            await this.router.navigate(['/auth/login']);
          }
        })
      );
  }

  logout() {
    return new Observable<void>((subscriber) => {
      this.deleteToken();
      this.profileService.deleteProfile();

      this.router.navigate(['/auth/login'])
        .then(() => subscriber.next());
    });
  }

  forgotPassword(email: string) {
    const url = `${this.apiUrl}/forgot-password`;

    return this.httpClient.post<HttpResponseModel<ForgotPasswordResponseModel>>(url, { email })
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: async (responseData) => {
            await this.router.navigate(['/auth/update-password', responseData?.passwordResetToken]);
          }
        })
      );
  }

  updatePassword(data: UpdatePasswordRequestModel) {
    const url = `${this.apiUrl}/update-password`;

    return this.httpClient.patch<HttpResponseModel<undefined>>(url, data)
      .pipe(
        tap({
          next: async () => {
            await this.router.navigate(['/auth/login']);
          }
        })
      );
  }
}
