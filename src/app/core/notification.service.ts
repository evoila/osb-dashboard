import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export enum NotificationType {
  Warning = <any>"warning",
  Info = <any>"info",
  Error = <any>"error"
}

export interface NotificationActionLink {
  title: string;
  routerLink: string[];
}

export class Notification {
  constructor(
    public readonly type: NotificationType,
    public readonly message: string,
    public readonly link?: NotificationActionLink) {
  }
}

@Injectable()
export class NotificationService {
  private readonly _notifications = new Subject<Notification | null>();

  public readonly notifications = this._notifications.asObservable();

  public add(notification: Notification) {
    this._notifications.next(notification);
  }

  public addSelfClosing(notification: Notification, debounce: number = 2500) {
    this._notifications.next(notification);
    setTimeout(() => this._notifications.next(null), debounce);
  }

}
