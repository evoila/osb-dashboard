import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { services } from './services/index';
import { ChartDirective } from './chart.directive';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { componentsDeclarations } from './components/index';
import { containerComponents } from './containers';
import { BottomSheetAggregationSheet } from './components/data-aggrgation-components/aggregation-list/aggregation-list.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AggregationEditorModule } from '../aggregation-editor/aggregation-editor.module';
import {
  NgbAccordionModule,
  NgbTabsetModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataListComponent } from './components/data-aggrgation-components/data-list/data-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('charts', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    ConfiguratorRoutingModule,
    MatBottomSheetModule,
    AggregationEditorModule,
    NgbAccordionModule,
    NgbTabsetModule,
    DragDropModule
  ],
  entryComponents: [BottomSheetAggregationSheet],
  declarations: [
    ChartDirective,
    ...componentsDeclarations,
    ...containerComponents,
    DataListComponent,

  ],
  providers: [...services]
})
export class ChartConfiguratorModule { }
