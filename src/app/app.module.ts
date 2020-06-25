import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; //not compatible with angular 8 !!
import * as monShared from './monitoring/shared/shared.module';
 
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry
} from 'ngx-schema-form';

import {
  NgbDropdownModule,
  NgbCollapseModule,
  NgbTypeaheadModule,
  NgbTooltipModule,
  NgbModalModule,
  NgbPopoverModule,
  NgbTabsetModule
} from '@ng-bootstrap/ng-bootstrap';

import { buildTarget } from 'environments/target';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { BuildTargetService } from 'app/shared';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/services/authentication.interceptor';

export function buildBuildTargetService(): BuildTargetService {
  return new BuildTargetService(buildTarget);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule, //not compatible since angular 8 !!
    HttpClientModule,
    monShared.SharedModule.forRoot(),

    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbTabsetModule.forRoot(),

    SchemaFormModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule,

    ...buildTarget.coreModules,

    AppRoutingModule
  ],
  providers: [
    { provide: BuildTargetService, useFactory: buildBuildTargetService },
    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
