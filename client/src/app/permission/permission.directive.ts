import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { ProfileService } from '../profile/profile.service';

interface PermissionDirectiveParam {
  allowedPermissions: Array<string>;
  disallowedPermissions?: Array<string>;
}

@Directive({
  selector: '[cdpPermissions]',
})
export class PermissionDirective {
  private hasView = false;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private profileService: ProfileService,
  ) {}

  @Input() set cdpPermissions({ allowedPermissions, disallowedPermissions = [] }: PermissionDirectiveParam) {
    const shouldView = this.profileService.profileData?.permissions
      .some((permission) => allowedPermissions.indexOf(permission) > -1);

    const shouldNotView = this.profileService.profileData?.permissions
      .some((permission) => disallowedPermissions.indexOf(permission) > -1);

    if (shouldView && !shouldNotView && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.template);
      this.hasView = true;
    } else if (!shouldView && shouldNotView && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
