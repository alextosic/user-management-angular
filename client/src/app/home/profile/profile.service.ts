import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HttpResponseModel } from '../../http-response.model';
import { ProfileModel } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileData: ProfileModel | undefined;
  profileDataChanged$ = new Subject<ProfileModel | undefined>();

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
            }
          },
        })
      );
  }
}
