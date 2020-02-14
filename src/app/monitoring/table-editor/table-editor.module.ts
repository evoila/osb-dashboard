import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEditorComponent } from './containers/table-editor/table-editor.component';
import { BaseQueryInputComponent } from './components/base-query-input/base-query-input.component';
import { ColumnBuilderComponent } from './components/column-builder/column-builder.component';
import { TablePreviewComponent } from './components/table-preview/table-preview.component';
import { QueryGroupComponent } from './components/query-group/query-group.component';
import { QueryEditorComponent } from './containers/query-editor/query-editor.component';
import { QuerySelectComponent } from './components/query-select/query-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableEditorComponent, BaseQueryInputComponent, ColumnBuilderComponent, TablePreviewComponent, QueryGroupComponent, QueryEditorComponent, QuerySelectComponent],
  exports: [TableEditorComponent]
})
export class TableEditorModule { }
