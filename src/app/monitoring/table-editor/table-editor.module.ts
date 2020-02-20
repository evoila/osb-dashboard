import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components'
import { containerComponents } from './containers'
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableEditorRoutingModule } from './table-editor-routing.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    TableEditorRoutingModule
  ],
  declarations: [ ...components, ...containerComponents]
})
export class TableEditorModule { }
