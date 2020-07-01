import { Component } from '@angular/core';

import { environment } from 'environments/runtime-environment';

import { NotificationService, Notification } from './core/notification.service';

import {
  BuildTargetService, ModuleSupport
} from 'app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public logoSrc = environment.ui.logoSrc;
  public isNavbarCollapsed: boolean = true;
  public readonly moduleSupport: ModuleSupport;
  public readonly dynamicModuleSupport: any;
  public readonly sharedModuleSupport: any;

  public notification: Notification | null = null;
  ngOnInit() {
    this.notifications.notifications.subscribe(x => {
      setTimeout(() => {
        this.notification = x;
      })
    });
  }
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notifications: NotificationService,
    buildTarget: BuildTargetService
  ) {
    this.dynamicModuleSupport = buildTarget.dynamicModuleSupport;
    this.sharedModuleSupport = buildTarget.sharedModuleSupport;
    this.moduleSupport = buildTarget.moduleSupport;

    //this.router.navigateByUrl("/" + environment.serviceInstanceId, { skipLocationChange: true });
    //this.router.navigate(["/home/" + environment.serviceInstanceId ], {replaceUrl:true});
  }

  public closeNotification() {
    this.notification = null;
  }
}
