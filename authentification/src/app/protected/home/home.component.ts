import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User | null;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = this.userService.userValue;
  }

  ngOnInit(): void {}
}
