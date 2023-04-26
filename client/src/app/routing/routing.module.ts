import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserCreateComponent } from '../user/user-create/user-create.component';
import { UserUpdateComponent } from '../user/user-update/user-update.component';
import { RoleListComponent } from '../role/role-list/role-list.component';
import { RoleCreateComponent } from '../role/role-create/role-create.component';
import { RoleUpdateComponent } from '../role/role-update/role-update.component';

import { AuthLoggedInGuard, AuthLoggedOutGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { RoutingTitleStrategy } from './routing.title-strategy';
import { UpdatePasswordComponent } from '../auth/update-password/update-password.component';

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
        path: 'user',
        children: [
          {
            path: '',
            title: 'User List',
            component: UserListComponent,
            canActivate: [PermissionGuard(['list_users', 'create_users'])],
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
            canActivate: [PermissionGuard(['view_users', 'update_users'])],
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
      {
        path: 'role',
        children: [
          {
            path: '',
            title: 'Role List',
            component: RoleListComponent,
            canActivate: [PermissionGuard(['list_roles', 'create_roles'])],
          },
          {
            path: 'create',
            title: 'Create Role',
            component: RoleCreateComponent,
            canActivate: [PermissionGuard(['create_roles'])],
          },
          {
            path: ':id',
            title: 'Role Page',
            component: RoleUpdateComponent,
            canActivate: [PermissionGuard(['view_roles', 'update_roles'])],
          },
          {
            path: '**',
            redirectTo: '',
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
