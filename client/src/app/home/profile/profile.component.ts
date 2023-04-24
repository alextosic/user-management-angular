import { Component, OnInit } from '@angular/core';

import { ProfileModel, ProfileUpdateModel } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'cdp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: ProfileModel | undefined = undefined;
  editable = false;

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
