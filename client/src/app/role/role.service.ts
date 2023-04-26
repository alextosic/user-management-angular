import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { RoleCreateModel, RoleListResponseModel, RoleModel, RoleUpdateModel } from './role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleListUpdated$ = new BehaviorSubject<Array<RoleModel>>([]);
  roleTotalUpdated$ = new BehaviorSubject<number>(0);

  private apiUrl = `${environment.apiUrl}/role`;

  constructor(private httpClient: HttpClient) {}

  getRoleList(page: number, perPage: number) {
    const url = `${this.apiUrl}/all`;
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

  getRole(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<HttpResponseModel<RoleModel>>(url)
      .pipe(
        map(response => response?.data)
      );
  }

  createRole(data: RoleCreateModel) {
    return this.httpClient.post<HttpResponseModel<undefined>>(this.apiUrl, data);
  }

  updateRole(id: string, data: RoleUpdateModel) {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.patch<HttpResponseModel<undefined>>(url, data);
  }

  deleteRole(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<HttpResponseModel<undefined>>(url);
  }
}
