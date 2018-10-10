import { Component } from '@angular/core';

import { environment } from 'environments/runtime-environment';

import { NotificationService, Notification } from './core/notification.service';

import {
  BuildTargetService, ModuleSupport
} from 'app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ExtensionUrlService } from 'app/core/extension-url.service';
import { ExtensionUrl, Server } from './core/extension-url';


@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public logoSrc = environment.ui.logoSrc;
  public isNavbarCollapsed: boolean;
  public readonly moduleSupport: ModuleSupport;
  public readonly dynamicModuleSupport: any;
  public readonly sharedModuleSupport: any;

  public notification: Notification | null = null;
  ngOnInit() {
    this.urlService.getExtension().subscribe(
      (data: ExtensionUrl) => {
       environment.extensionUrls = data;
      }
    )
  }
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notifications: NotificationService,
    private readonly urlService: ExtensionUrlService,
    buildTarget: BuildTargetService
  ) {
    this.dynamicModuleSupport = buildTarget.dynamicModuleSupport;
    this.sharedModuleSupport = buildTarget.sharedModuleSupport;
    this.moduleSupport = buildTarget.moduleSupport;

    console.log("This is our starting point");
    this.notifications.notifications.subscribe(x => {
      console.log(x)
      this.notification = x
    });

    //this.router.navigateByUrl("/" + environment.serviceInstanceId, { skipLocationChange: true });
    //this.router.navigate(["/home/" + environment.serviceInstanceId ], {replaceUrl:true});
  }

  public closeNotification() {
    this.notification = null;
  }
}
