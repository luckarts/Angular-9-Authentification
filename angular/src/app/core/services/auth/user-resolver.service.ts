import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<any> {
  user: User;
  constructor(private userService: UserService) {}

  resolve(): User {
    this.userService.user$.subscribe((user: User) => (this.user = user));
    if (this.user) {
      return this.user;
    } else {
      return;
    }
  }
}
