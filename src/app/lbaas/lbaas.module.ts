import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LBaasComponent } from './lbaas.component';
import { LBaasService } from './lbaas.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LBaasRoutingModule } from './lbaas-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    NgbTabsetModule,
    LBaasRoutingModule
  ],
  declarations: [LBaasComponent],
  providers: [LBaasService]
})
export class LBaasModule { }
