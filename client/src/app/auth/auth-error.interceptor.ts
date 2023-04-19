import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.messageService.hide();

    return next.handle(req)
      .pipe(
        tap({
          error: (err) => {
            if (err.status === 401) {
              console.log('User unauthorized, logging out');
            }

            this.messageService.show(err.error.message);
          }
        })
      );
  }
}
