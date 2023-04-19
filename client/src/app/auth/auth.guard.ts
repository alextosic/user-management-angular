import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';

export const AuthLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedIn = authService.getToken();

  if (loggedIn) {
    return true;
  } else {
    return router.navigate(['/']);
  }
};

export const AuthLoggedOutGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedIn = authService.getToken();

  if (!loggedIn) {
    return true;
  } else {
    return router.navigate(['/profile']);
  }
};
