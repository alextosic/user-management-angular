import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthLoggedInGuard, AuthLoggedOutGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthLoggedOutGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthLoggedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
