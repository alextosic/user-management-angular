import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ProfileService } from '../home/profile/profile.service';

export const AdminGuard: CanActivateFn = () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.profileData?.role === 'ADMIN') {
    return true;
  }

  return router.navigate(['/']);
};
