import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LBaasComponent } from './lbaas.component';

export const ROUTES = [
  {
    path: '',
    component: LBaasComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LBaasRoutingModule { }
