// this component lets the user define table columns
// from the data returned by the all valid queries via query-group component 

import { Component, OnInit, Optional } from '@angular/core';
import { ColumnDefinition } from '../../model/column-definition';
import { TableEditorComponent } from '../../containers/table-editor/table-editor.component';

@Component({
  selector: 'sb-column-builder',
  templateUrl: './column-builder.component.html',
  styleUrls: ['./column-builder.component.scss']
})
export class ColumnBuilderComponent implements OnInit {

  fields: Array<string>;
  // id of currently edited column-definition
  is_editing_cdef_id: number = -1;


  constructor(@Optional() public parent: TableEditorComponent){
    
    this.fields = parent.selectable_fields;
}


  

  ngOnInit() {
  }




  // user did select a persisted or newly created es-query via drop down select
  did_select_datafield(field: string){
    console.log('did select data field');
    console.log(field);
    
  }


  public save_column(){

    //this.parent.columnDefinitions.push(new ColumnDefinition("enter name"))

  }

  

}
