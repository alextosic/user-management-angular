import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class RoutingTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.title.setTitle(`${title} - Cyrillic Demo Project`);
    } else {
      this.title.setTitle('Cyrillic Demo Project');
    }
  }
}
