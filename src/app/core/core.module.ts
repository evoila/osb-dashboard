import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend } from '@angular/http';

import { CoreHttpService, InlineLoaderDirective } from './';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { RouterModule } from '@angular/router';
import { NotificationService, EntityService } from './';

import { SidebarLayoutComponent } from './sidebar/sidebar-layout/sidebar-layout.component';
import { SidebarNavComponent, SidebarLinkNotActiveFilterPipe } from './sidebar/sidebar-nav/sidebar-nav.component';
import { ToolbarButtonComponent } from './sidebar/toolbar-button/toolbar-button.component';
import { ToolbarComponent } from './sidebar/toolbar/toolbar.component';
import { ToolbarLinkComponent } from './sidebar/toolbar-link/toolbar-link.component';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowService } from './window.service';
import { WizardComponent } from './wizard/wizard/wizard.component';
import { WizardPageSubmitButtonComponent } from './wizard/wizard-page-submit-button/wizard-page-submit-button.component';
import { WizardPageComponent } from './wizard/wizard-page/wizard-page.component';
import { WizardStepComponent } from './wizard/wizard-step/wizard-step.component';
import { FocusDirective } from './wizard';
import { CustomEndpointService } from './custom-endpoint.service';
import { FormSchemaService } from './form-schema.service';
import { TaskPollingService } from './task-polling.service';
import { TaskPollingComponent } from './task-polling/task-polling.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';

export function coreHttpFactory(backend: XHRBackend) {
  return new CoreHttpService(backend);
}

const components = [
  NotificationBannerComponent,
  ShowErrorsComponent,
  InlineLoaderDirective,
  SidebarLayoutComponent,
  SidebarNavComponent,
  SidebarLinkNotActiveFilterPipe,
  ToolbarButtonComponent,
  ToolbarComponent,
  ToolbarLinkComponent,
  WizardComponent,
  WizardStepComponent,
  WizardPageComponent,
  FocusDirective,
  WizardPageSubmitButtonComponent,
  TaskPollingComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule.forRoot(),
    NgbDropdownModule.forRoot()
  ],
  declarations: [components],
  exports: [components],
  providers: []
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
        WindowService,
        CustomEndpointService,
        FormSchemaService,
        TaskPollingService
     ]
    };
  }
 }
