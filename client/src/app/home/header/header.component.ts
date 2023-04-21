import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileModel } from '../profile/profile.model';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cdp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileData: Observable<ProfileModel | undefined> = new Observable();

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileData = this.profileService.profileDataChanged$.asObservable();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
