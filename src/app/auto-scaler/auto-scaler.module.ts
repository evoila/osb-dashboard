import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoScalerComponent } from './auto-scaler.component';
import { AutoScalerRoutingModule } from './auto-scaler-routing.module';

import { NouisliderComponent } from 'ng2-nouislider';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoScalerRoutingModule
  ],
  declarations: [AutoScalerComponent, NouisliderComponent]
})
export class AutoScalerModule { }
