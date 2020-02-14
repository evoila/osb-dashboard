
//import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableEditorComponent } from './containers/table-editor/table-editor.component';


const routes: Routes = [
  {
    path: '',
    component: TableEditorComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class TableEditorRoutingModule { }
