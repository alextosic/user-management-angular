import { Component, OnInit } from '@angular/core';

import { ProfileModel, ProfileUpdateModel } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'cdp-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileData: ProfileModel | undefined = undefined;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileDataChanged$.subscribe((profileData) => {
      this.profileData = profileData;
    });
  }

  updateProfile(profileData: ProfileUpdateModel) {
    this.profileService.updateProfile(profileData).subscribe();
  }
}
