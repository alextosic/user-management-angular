import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map } from 'rxjs';

import { AuthService } from './auth.service';
import { ProfileService } from '../home/profile/profile.service';

export const AuthLoggedInGuard: CanActivateFn = () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  return profileService.getProfile()
    .pipe(
      map((profile): boolean => !!profile),
      catchError((): Promise<boolean> => router.navigate(['/login']))
    );
};

export const AuthLoggedOutGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedIn = authService.getToken();

  if (!loggedIn) {
    return true;
  } else {
    return router.navigate(['/']);
  }
};
