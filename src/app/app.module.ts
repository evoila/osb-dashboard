import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function buildBuildTargetService(): BuildTargetService {
  return new BuildTargetService(buildTarget);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbTypeaheadModule,
    NgbTabsetModule,

    CoreModule.forRoot(),
    SharedModule,

    ...buildTarget.coreModules,

    AppRoutingModule,
  ],
  providers: [
    { provide: BuildTargetService, useFactory: buildBuildTargetService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
