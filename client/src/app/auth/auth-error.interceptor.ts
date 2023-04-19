import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap({
          error: (err) => {
            if (err.status === 401 || err.status === 403) {
              console.log('User unauthorized, logging out');
            }

            console.log(`Showing error toast message - ${err.error.message}`);
          }
        })
      );
  }
}
