import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { HttpConnectorsService } from '../http/http-connectors.service';
import { User } from 'src/app/shared/models';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface LoginResponse {
  user: User;
  token: string;
}
export interface LoginModel {
  username: string;

  password: string;
}
export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}
export interface UserResponse {
  message: string;
  user: User;
  token: string;
}

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new BehaviorSubject<User>(undefined);
  public anonymousUser$ = new BehaviorSubject<boolean>(true);
  public user$ = this.subject.asObservable().pipe(filter((user) => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user: User) => !!user.id));

  constructor(
    private httpConnectorsService: HttpConnectorsService,
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.getToken()) {
      httpConnectorsService
        .getRequest(environment.api + '/api/users/me')
        .subscribe((user: User) => {
          console.log('user');
          this.subject.next(user);
        });
    }
  }
  public get userValue(): User {
    return this.subject.value;
  }
  getToken(): string {
    return localStorage.getItem('token');
  }

  signUp(user: RegisterModel): Observable<UserResponse> {
    return this.httpConnectorsService.postRequest(environment.api + '/api/users/signup', user).pipe(
      map((response: UserResponse) => {
        if (response) {
          this.subject.next(response.user);
          return response;
        }
      })
    );
  }

  login(user): Observable<LoginResponse> {
    return this.httpConnectorsService.postRequest(environment.api + `/api/users/signin`, user).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.subject.next(response.user);
          return response;
        }
      })
    );
  }
  update(user: User): Observable<User> {
    return this.httpConnectorsService.putRequest(environment.api + `/api/users/update`, user);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.subject.next(null);
    this.alertService.sendMessage('you are disconnected');
    this.router.navigateByUrl('login');
  }
}
