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

  updateProfile(data: ProfileUpdateModel) {
    return this.httpClient.patch<HttpResponseModel<ProfileModel>>(this.apiUrl, data)
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
