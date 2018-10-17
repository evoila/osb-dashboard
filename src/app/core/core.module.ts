import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend } from '@angular/http';

import { HomeComponent } from './';
import { CoreHttpService,
  InlineLoaderDirective } from './';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { RouterModule } from '@angular/router';
import { NotificationService, EntityService } from './';
import { ShowErrorsComponent } from './show-errors/show-errors.component';

import { SidebarLayoutComponent } from './sidebar/sidebar-layout/sidebar-layout.component';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';
import { ToolbarButtonComponent } from './sidebar/toolbar-button/toolbar-button.component';
import { ToolbarComponent } from './sidebar/toolbar/toolbar.component';
import { ToolbarLinkComponent } from './sidebar/toolbar-link/toolbar-link.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowService } from './window.service';

export function coreHttpFactory(backend: XHRBackend) {
  return new CoreHttpService(backend);
}

const components = [
  HomeComponent,
  NotificationBannerComponent,
  InlineLoaderDirective,
  ShowErrorsComponent,
  SidebarLayoutComponent,
  SidebarNavComponent, 
  ToolbarButtonComponent,
  ToolbarComponent,
  ToolbarLinkComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule.forRoot()
  ],
  declarations: [components],
  exports: [components]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{
          provide: CoreHttpService,
          useFactory: coreHttpFactory,
          deps: [XHRBackend]
        },
        NotificationService,
        EntityService,
        WindowService
     ]
    };
  }
 }
