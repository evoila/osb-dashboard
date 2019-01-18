import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { containerComponents } from './container/indext';
import { components } from './components';
import { reducers } from './store/reducers';
import { PanelConfiguratorRoutingModule } from './panel-configurator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('panel', reducers),
    SharedModule,
    NgbAccordionModule,
    DragDropModule,
    PanelConfiguratorRoutingModule
  ],
  declarations: [...containerComponents, ...components]
})
export class PanelConfiguratorModule {}
