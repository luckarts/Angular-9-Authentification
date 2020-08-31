import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert.service';

export interface InterfaceMessage {
  text: string;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;
  message: InterfaceMessage;
  subscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService
      .onMessage()
      .subscribe((messages: InterfaceMessage) => (this.message = messages));
  }
}
