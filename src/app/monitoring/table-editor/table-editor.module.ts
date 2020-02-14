import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEditorComponent } from './containers/table-editor/table-editor.component';
import { components } from './components'
import { containerComponents } from './containers'
import { SharedModule } from '../shared/shared.module';
import { QueryEditorComponent } from './containers/query-editor/query-editor.component';
import { BaseQueryInputComponent } from './components/base-query-input/base-query-input.component';
import { ColumnBuilderComponent } from './components/column-builder/column-builder.component';
import { QueryGroupComponent } from './components/query-group/query-group.component';
import { QuerySelectComponent } from './components/query-select/query-select.component';
import { TablePreviewComponent } from './components/table-preview/table-preview.component';
import { FormsModule } from '@angular/forms';
import { TableEditorRoutingModule } from './table-editor-routing.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule
  ],
  declarations: [ ...components, ...containerComponents],
  exports: [TableEditorRoutingModule, TableEditorComponent, QueryEditorComponent, BaseQueryInputComponent, ColumnBuilderComponent, QueryGroupComponent, QuerySelectComponent, TablePreviewComponent]
})
export class TableEditorModule { }
