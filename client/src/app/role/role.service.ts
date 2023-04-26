import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { RoleListResponseModel, RoleModel } from './role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleListUpdated$ = new BehaviorSubject<Array<RoleModel>>([]);
  roleTotalUpdated$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  getRoleList(page: number, perPage: number) {
    const url = `${environment.apiUrl}/role/all`;
    const options = { params: new HttpParams({ fromObject: { page, perPage } }) };

    return this.httpClient.get<HttpResponseModel<RoleListResponseModel>>(url, options)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: (responseData) => {
            if (responseData) {
              this.roleListUpdated$.next(responseData.roles);
              this.roleTotalUpdated$.next(responseData.total);
            }
          },
        })
      );
  }

  deleteRole(id: string) {
    const url = `${environment.apiUrl}/role/${id}`;
    return this.httpClient.delete<HttpResponseModel<undefined>>(url);
  }
}
