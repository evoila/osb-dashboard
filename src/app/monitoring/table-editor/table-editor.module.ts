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
import { ColumnDefinitionComponent } from './components/column-definition/column-definition.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    StoreModule.forFeature('queries', reducers),
    EffectsModule.forFeature(effects),
    TableEditorRoutingModule
  ],
  declarations: [ ...components, ...containerComponents, ColumnDefinitionComponent]
})
export class TableEditorModule { }
