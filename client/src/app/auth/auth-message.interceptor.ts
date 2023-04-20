import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { MessageService } from '../message/message.service';
import { HttpResponseModel } from '../http-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthMessageInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.messageService.hide();

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
              console.log('User unauthorized, logging out');
            }

            this.messageService.show(err.error.message, 'error');
          }
        })
      );
  }
}
