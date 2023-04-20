import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'cdp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | undefined = undefined;
  editable = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe((profileData) => this.initData(profileData));
    this.profileService.profileDataChanged$.subscribe((profileData) => this.initData(profileData));
  }

  initData(profileData: ProfileModel | undefined) {
    this.profileForm = new FormGroup<any>({
      email: new FormControl(profileData?.email),
      firstName: new FormControl(profileData?.firstName),
      lastName: new FormControl(profileData?.lastName),
    });

    this.disableEdit();
  }

  enableEdit() {
    this.editable = true;

    this.profileForm?.get('firstName')?.enable();
    this.profileForm?.get('lastName')?.enable();
  }

  disableEdit() {
    this.editable = false;
    this.profileForm?.disable();
  }

  updateProfile() {
    this.profileService.updateProfile({
      firstName: this.profileForm?.get('firstName')?.value,
      lastName: this.profileForm?.get('lastName')?.value,
    }).subscribe();
  }
}
