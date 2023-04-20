import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { LoginRequestModel, LoginResponseModel } from './login/login.model';
import { RegisterRequestModel } from './register/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  constructor(private httpClient: HttpClient) {}

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

  login(data: LoginRequestModel) {
    const url = `${environment.apiUrl}/auth/login`;

    return this.httpClient.post<HttpResponseModel<LoginResponseModel>>(url, data)
      .pipe(
        tap({
          next: (result) => {
            if (result?.data?.token) {
              this.saveToken(result.data.token);
            }
          },
        })
      );
  }

  register(data: RegisterRequestModel) {
    const url = `${environment.apiUrl}/auth/register`;
    return this.httpClient.post<HttpResponseModel<LoginResponseModel>>(url, data);
  }
}
