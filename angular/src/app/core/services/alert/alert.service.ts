import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new BehaviorSubject<any>(undefined);

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next('');
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
