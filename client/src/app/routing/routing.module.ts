import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../home/profile/profile.component';
import { AdminComponent } from '../admin/admin.component';
import { UserListComponent } from '../admin/user/user-list/user-list.component';
import { UserCreateComponent } from '../admin/user/user-create/user-create.component';
import { UserUpdateComponent } from '../admin/user/user-update/user-update.component';

import { AuthLoggedInGuard, AuthLoggedOutGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../auth/permission/permission.guard';
import { RoutingTitleStrategy } from './routing.title-strategy';
import { UpdatePasswordComponent } from '../auth/update-password/update-password.component';

import { defaultPermissions } from '../auth/permission/permission.constants';

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
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'update-password/:passwordResetToken',
        component: UpdatePasswordComponent,
        title: 'Update Password',
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
        children: [
          {
            path: 'user',
            children: [
              {
                path: '',
                title: 'User List',
                component: UserListComponent,
                canActivate: [PermissionGuard(['list_users'])],
              },
              {
                path: 'create',
                title: 'Create User',
                component: UserCreateComponent,
                canActivate: [PermissionGuard(['create_users'])],
              },
              {
                path: ':id',
                title: 'User Page',
                component: UserUpdateComponent,
                canActivate: [PermissionGuard(['view_users'])],
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
