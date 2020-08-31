import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AlertService } from '../services/';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errors;
        if (error.error.error) {
          errors = error.error.error;
        }
        if (error.status === 404 || error.status === 0) {
          // client-side error
          this.alertService.sendMessage('No connection');
        } else if (errors.email) {
          this.alertService.sendMessage(errors.email);
        } else if (errors.username) {
          this.alertService.sendMessage(errors.username);
        } else if (errors.password) {
          this.alertService.sendMessage(errors.password);
        } else {
          // server-side error
          this.alertService.sendMessage(error.error.message);
        }

        return throwError(error);
      })
    );
  }
}
