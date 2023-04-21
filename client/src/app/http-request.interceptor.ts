import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';

import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const authReq = token ? req.clone({
      headers: req.headers.set('Authorization', `Basic ${token}`)
    }) : req;

    return next.handle(authReq);
  }
}
