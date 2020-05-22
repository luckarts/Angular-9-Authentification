import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { UserService, AlertService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (localStorage.getItem('token')) {
      return this.userService.isLoggedIn$;
    } else {
      this.alertService.sendMessage('you are not authorized');
      this.router.navigateByUrl('/login');
      return of(false);
    }
  }
}
