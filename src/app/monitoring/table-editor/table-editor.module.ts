import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEditorComponent } from './containers/table-editor/table-editor.component';
import { BaseQueryInputComponent } from './components/base-query-input/base-query-input.component';
import { ColumnBuilderComponent } from './components/column-builder/column-builder.component';
import { TablePreviewComponent } from './components/table-preview/table-preview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableEditorComponent, BaseQueryInputComponent, ColumnBuilderComponent, TablePreviewComponent],
  exports: [TableEditorComponent]
})
export class TableEditorModule { }
