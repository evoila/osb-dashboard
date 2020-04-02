import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components'
import { containerComponents } from './containers'
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableEditorRoutingModule } from './table-editor-routing.module'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { TableService } from '../shared/services/table.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature('queries', reducers),
    EffectsModule.forFeature(effects),
    TableEditorRoutingModule
  ],
  declarations: [ ...components, ...containerComponents],
  providers: [TableService]
})
export class TableEditorModule { }
