import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { LoginDataModel } from './login/login-data.model';

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

  login(email: string, password: string) {
    return this.httpClient.post<HttpResponseModel<LoginDataModel>>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap({
          next: (result) => {
            if (result?.data?.token) {
              this.saveToken(result.data.token);
            }
          },
        })
      )
  }
}
