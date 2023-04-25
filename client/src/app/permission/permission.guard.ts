import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ProfileService } from '../profile/profile.service';

export const PermissionGuard = (allowedPermissions: Array<string>): CanActivateFn => () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  const shouldView = profileService.profileData?.permissions.some(
    permission => allowedPermissions.indexOf(permission) > -1,
  );

  if (shouldView) {
    return true;
  }

  return router.navigate(['/']);
};
