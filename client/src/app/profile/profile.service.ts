import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpResponseModel } from '../http-response.model';
import { ProfileModel, ProfileUpdateModel } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileData: ProfileModel | undefined;
  profileDataChanged$ = new BehaviorSubject<ProfileModel | undefined>(undefined);

  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private httpClient: HttpClient) {}

  getProfile(): Observable<ProfileModel | undefined> {
    if (this.profileData) {
      return new Observable<ProfileModel | undefined>((subscriber) => {
        subscriber.next(this.profileData);
      });
    }

    return this.fetchProfile();
  }

  profileHasPermissions(permissions: Array<string>): boolean {
    return this.profileData?.permissions.some(
      permission => permissions.indexOf(permission) > -1,
    ) || false;
  }

  fetchProfile() {
    return this.httpClient.get<HttpResponseModel<ProfileModel>>(this.apiUrl)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: (profileData) => {
            if (profileData) {
              this.profileData = profileData;
              this.profileDataChanged$.next(profileData);
            }
          },
        })
      );
  }

  updateProfile(body: ProfileUpdateModel) {
    return this.httpClient.patch<HttpResponseModel<ProfileModel>>(this.apiUrl, body)
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        tap({
          next: (profileData) => {
            if (profileData) {
              this.profileData = profileData;
              this.profileDataChanged$.next(profileData);
            }
          },
        })
      );
  }

  deleteProfile() {
    this.profileData = undefined;
    this.profileDataChanged$.next(undefined);
  }

  addMfa(type: string) {
    const url = `${this.apiUrl}/mfa`;
    const options = { params: new HttpParams({ fromObject: { type } }) };

    return this.httpClient.post<HttpResponseModel<undefined>>(url, null, options)
      .pipe(
        tap({
          next: () => {
            this.fetchProfile().subscribe();
          },
        })
      );
  }

  verifyMfa(verificationCode: string) {
    const url = `${this.apiUrl}/mfa/verify`;
    const body = { verificationCode };

    return this.httpClient.post<HttpResponseModel<undefined>>(url, body)
      .pipe(
        tap({
          next: () => {
            this.fetchProfile().subscribe();
          },
        })
      );
  }

  removeMfa(verificationCode: string) {
    const url = `${this.apiUrl}/mfa/remove`;
    const body = { verificationCode };

    return this.httpClient.post<HttpResponseModel<undefined>>(url, body)
      .pipe(
        tap({
          next: () => {
            this.fetchProfile().subscribe();
          },
        })
      );
  }
}
