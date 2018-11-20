import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';

import { BuildTargetService, ModuleSupport } from 'app/shared';
import { GeneralService } from './shared/general/general.service';
import { NotificationService, Notification } from './core/notification.service';

import { environment } from 'environments/runtime-environment';

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
  }
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notifications: NotificationService,
    private readonly generalService: GeneralService,
    buildTarget: BuildTargetService
  ) {
    this.dynamicModuleSupport = buildTarget.dynamicModuleSupport;
    this.sharedModuleSupport = buildTarget.sharedModuleSupport;
    this.moduleSupport = buildTarget.moduleSupport;

    this.notifications.notifications.subscribe(x => {
      this.notification = x;
    });

    this.generalService.loadServiceInstance().subscribe(serviceInstance => {
      environment.serviceInstance = serviceInstance;
    });
  }

  public closeNotification() {
    this.notification = null;
  }
}
