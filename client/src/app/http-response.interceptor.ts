import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { MessageService } from './message/message.service';
import { AuthService } from './auth/auth.service';
import { HttpResponseModel } from './http-response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap({
          next: (result: HttpEvent<HttpResponseModel<any>>) => {
            if (req.method !== 'GET' && result instanceof HttpResponse && result.body) {
              this.messageService.show(result.body.message, 'success');
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.authService.logout().subscribe();
            }

            this.messageService.show(err.error.message, 'error');
          }
        })
      );
  }
}
