import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileModel } from '../profile/profile.model';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'cdp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileData: ProfileModel | undefined = undefined;

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile()
      .subscribe((profileData) => {
        this.profileData = profileData;
      });
  }

  logout() {
    this.authService.logout().subscribe(async () => {
      await this.router.navigate(['/login']);
    });
  }

  protected readonly undefined = undefined;
}
