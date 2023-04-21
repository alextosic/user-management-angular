import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserListResponseModel, UserModel } from './user.model';
import { HttpResponseModel } from '../../http-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userListUpdated$ = new BehaviorSubject<Array<UserModel>>([]);
  userTotalUpdated$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  getUserList(page: number, perPage: number) {
    const url = `${environment.apiUrl}/user/all`;
    const options = { params: new HttpParams({ fromObject: { page, perPage } }) };

    return this.httpClient.get<HttpResponseModel<UserListResponseModel>>(url, options)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: (responseData) => {
            if (responseData) {
              this.userListUpdated$.next(responseData.users);
              this.userTotalUpdated$.next(responseData.total);
            }
          },
        })
      );
  }

  deleteUser(id: string) {
    const url = `${environment.apiUrl}/user/${id}`;
    return this.httpClient.delete<HttpResponseModel<undefined>>(url);
  }
}
