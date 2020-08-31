import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent implements OnInit {
  activeId = 1;
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  constructor(private userService: UserService) {}

  active;
  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.user$ = this.userService.user$;
  }

  logout() {
    this.userService.logout();
  }
}
