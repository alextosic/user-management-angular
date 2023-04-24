import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { LoginRequestModel, LoginResponseModel } from './login/login.model';
import { RegisterRequestModel } from './register/register.model';
import { ProfileService } from '../home/profile/profile.service';
import { ForgotPasswordResponseModel } from './forgot-password/forgot-password.model';
import { UpdatePasswordRequestModel } from './update-password/update-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

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
    const url = `${environment.apiUrl}/auth/login`;

    return this.httpClient.post<HttpResponseModel<LoginResponseModel>>(url, data)
      .pipe(
        tap({
          next: async (result) => {
            if (result?.data?.token) {
              this.saveToken(result.data.token);
              await this.router.navigate(['/']);
            }
          },
        })
      );
  }

  register(data: RegisterRequestModel) {
    const url = `${environment.apiUrl}/auth/register`;
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
    const url = `${environment.apiUrl}/auth/forgot-password`;
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

  updatePassword(passwordResetToken: string, data: UpdatePasswordRequestModel) {
    const url = `${environment.apiUrl}/auth/update-password/${passwordResetToken}`;
    return this.httpClient.patch<HttpResponseModel<undefined>>(url, data)
      .pipe(
        tap({
          next: async (responseData) => {
            await this.router.navigate(['/auth/login']);
          }
        })
      );
  }
}
