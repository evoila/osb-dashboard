import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  NgbDropdownModule, NgbCollapseModule, NgbTypeaheadModule,
  NgbTooltipModule, NgbModalModule, NgbPopoverModule, NgbTabsetModule
} from '@ng-bootstrap/ng-bootstrap';

import { buildTarget } from 'environments/target';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { BuildTargetService } from 'app/shared';
import { SharedModule } from './shared/shared.module';

import { APP_BASE_HREF } from '@angular/common';

export function buildBuildTargetService(): BuildTargetService {
  return new BuildTargetService(buildTarget);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbTabsetModule.forRoot(),

    CoreModule.forRoot(),
    SharedModule,

    ...buildTarget.coreModules,

    AppRoutingModule,
  ],
  providers: [
    { provide: BuildTargetService, useFactory: buildBuildTargetService },
    { provide: APP_BASE_HREF, useValue: window['BASE_HREF'] || "/" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
