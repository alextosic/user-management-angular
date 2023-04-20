import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';

import { AuthLoggedInGuard, AuthLoggedOutGuard } from '../auth/auth.guard';
import { RoutingTitleStrategy } from './routing.title-strategy';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [AuthLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [AuthLoggedOutGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthLoggedInGuard],
    children: [
      {
        path: '',
        title: 'Profile',
        component: ProfileComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: TitleStrategy, useClass: RoutingTitleStrategy }
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
