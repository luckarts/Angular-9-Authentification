import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AlertService, UserService } from '../services';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('token');
    console.log(idToken, 'token');
    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return next.handle(cloned).pipe(
        catchError((err) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            this.alertService.sendMessage('You are not authorized');
            this.router.navigateByUrl('/login');
          }
          if (err.status === 0) {
            localStorage.removeItem('token');
            this.alertService.sendMessage('No connection');
            this.router.navigateByUrl('/login');
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
