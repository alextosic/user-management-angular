import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { ProfileService } from '../profile/profile.service';

@Directive({
  selector: '[cdpPermissions]',
})
export class PermissionDirective implements OnInit {
  private show = false;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    this.renderTemplate();
  }

  @Input() set cdpPermissions(permissions: Array<string>) {
    this.show = this.profileService.profileData?.permissions
      .some((permission) => permissions.indexOf(permission) > -1) || false;

    this.renderTemplate();
  }

  @Input() cdpPermissionsElse?: TemplateRef<unknown>;

  private renderTemplate() {
    this.viewContainer.clear();

    if (this.show) {
      this.viewContainer.createEmbeddedView(this.template);
    } else if (this.cdpPermissionsElse) {
      this.viewContainer.createEmbeddedView(this.cdpPermissionsElse);
    }
  }
}
