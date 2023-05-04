import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProfileService } from '../profile.service';
import { ProfileModel } from '../profile.model';

@Component({
  selector: 'cdp-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['../../shared/form.styles.scss', './mfa.component.scss'],
})
export class MfaComponent implements OnInit {
  profileData: ProfileModel | undefined;

  creating: boolean = false;
  removing: boolean = false;
  selectedType = 'totp';
  mfaTypes: Array<{ text: string, value: string }> = [
    { text: 'Time-based one-time password', value: 'totp'},
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileDataChanged$.subscribe((profileData) => {
      this.profileData = profileData;

      this.creating = false;
      this.removing = false;
    });
  }

  toggleCreating(creating: boolean) {
    this.creating = creating;
  }

  toggleRemoving(removing: boolean) {
    this.removing = removing;
  }

  addMfa() {
    this.profileService.addMfa(this.selectedType).subscribe();
  }

  verifyMfa(verificationCode: string) {
    this.profileService.verifyMfa(verificationCode).subscribe();
  }

  removeMfa(verificationCode: string) {
    this.profileService.removeMfa(verificationCode).subscribe();
  }

  currentMfaType() {
    return this.mfaTypes.find((mfaType) => mfaType.value === this.profileData?.mfa?.type)?.text;
  }
}
