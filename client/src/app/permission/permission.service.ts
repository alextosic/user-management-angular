import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { PermissionModel } from './permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  permissionListUpdated$ = new BehaviorSubject<Array<PermissionModel>>([]);

  private apiUrl = `${environment.apiUrl}/permission`;

  constructor(private httpClient: HttpClient) {}

  getPermissionList() {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.get<HttpResponseModel<Array<PermissionModel>>>(url)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: (responseData) => {
            if (responseData) {
              this.permissionListUpdated$.next(responseData);
            }
          },
        })
      );
  }
}
