import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileModel } from '../../profile/profile.model';
import { ProfileService } from '../../profile/profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'cdp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileData: Observable<ProfileModel | undefined> = new Observable();

  private currentUrl: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileData = this.profileService.profileDataChanged$.asObservable();

    this.currentUrl = this.router.url;
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.currentUrl = routerEvent.url;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }

  urlContains(urlPart: string, exact?: boolean): boolean {
    return exact ? this.currentUrl === urlPart : this.currentUrl?.indexOf(urlPart) > -1;
  }
}
