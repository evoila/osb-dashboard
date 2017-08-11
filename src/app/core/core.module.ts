import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend } from '@angular/http';

import { HomeComponent } from './';
import { CoreHttpService } from './core-http.service';

export function coreHttpFactory(backend: XHRBackend) {
  return new CoreHttpService(backend);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{
          provide: CoreHttpService,
          useFactory: coreHttpFactory,
          deps: [XHRBackend]
      }]
    };
  }
 }
