import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './';
import { CoreHttpService } from './core-http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, CoreHttpService],
  exports: [HomeComponent, CoreHttpService]
})
export class CoreModule { }
