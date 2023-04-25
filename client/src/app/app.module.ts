import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { RoutingModule } from './routing/routing.module';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { HttpResponseInterceptor } from './http-response.interceptor';

import { AppComponent } from './app.component';
import { CreateFormComponent } from './shared/create-form/create-form.component';
import { UpdateFormComponent } from './shared/update-form/update-form.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UserDeleteDialog } from './admin/user/user-delete.dialog';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserCreateComponent } from './admin/user/user-create/user-create.component';
import { UserUpdateComponent } from './admin/user/user-update/user-update.component';

import { PermissionDirective } from './auth/permission/permission.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    UpdateFormComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    AdminComponent,
    UserListComponent,
    UserDeleteDialog,
    UserCreateComponent,
    UserUpdateComponent,

    PermissionDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,

    RoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
