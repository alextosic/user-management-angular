import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../home/profile/profile.component';
import { AdminComponent } from '../admin/admin.component';
import { UserListComponent } from '../admin/user/user-list/user-list.component';

import { AuthLoggedInGuard, AuthLoggedOutGuard } from '../auth/auth.guard';
import { AdminGuard } from '../admin/admin.guard';
import { RoutingTitleStrategy } from './routing.title-strategy';
import { AuthComponent } from '../auth/auth.component';
import { UserCreateComponent } from '../admin/user/user-create/user-create.component';
import { UserUpdateComponent } from '../admin/user/user-update/user-update.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthLoggedOutGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
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
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: 'user',
            children: [
              {
                path: '',
                title: 'User List',
                component: UserListComponent,
              },
              {
                path: 'create',
                title: 'Create User',
                component: UserCreateComponent,
              },
              {
                path: ':id',
                title: 'Update User',
                component: UserUpdateComponent,
              },
              {
                path: '**',
                redirectTo: '',
              },
            ],
          },
          {
            path: '**',
            redirectTo: 'user',
          },
        ],
      },
    ],
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
