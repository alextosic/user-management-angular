import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) {}

  getProfile(): Observable<ProfileModel | undefined> {
    if (this.profileData) {
      return new Observable<ProfileModel | undefined>((subscriber) => {
        subscriber.next(this.profileData);
      });
    }

    return this.fetchProfile();
  }

  fetchProfile() {
    const url = `${environment.apiUrl}/profile`;

    return this.httpClient.get<HttpResponseModel<ProfileModel>>(url)
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

  updateProfile(data: ProfileUpdateModel) {
    const url = `${environment.apiUrl}/profile`;

    return this.httpClient.patch<HttpResponseModel<ProfileModel>>(url, data)
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
}
