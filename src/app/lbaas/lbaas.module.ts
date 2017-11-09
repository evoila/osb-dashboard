import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LBaasComponent } from './lbaas.component';
import { LBaasService } from './lbaas.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LBaasRoutingModule } from './lbaas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    LBaasRoutingModule
  ],
  declarations: [LBaasComponent],
  providers: [LBaasService]
})
export class LBaasModule { }
