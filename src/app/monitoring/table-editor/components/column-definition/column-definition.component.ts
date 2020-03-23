import { Component, OnInit, Optional, Output, EventEmitter } from '@angular/core';
import { ColumnDefinition } from '../../model/column-definition';
import { ColumnBuilderComponent } from '../column-builder/column-builder.component';
import { ColumnMapping } from '../../model/column-mapping';

@Component({
  selector: 'sb-column-definition',
  templateUrl: './column-definition.component.html',
  styleUrls: ['./column-definition.component.scss']
})
export class ColumnDefinitionComponent implements OnInit {


  @Output('data_field')
  data_field = new EventEmitter<string>();

  // all selectable datafields list maintained by Grandparent Table Editor Component 
  fields: Array<string>;
  choosen: number = -1;
  cdef_name: string = "";
  cdef_data: ColumnMapping | null = null;

  constructor(@Optional() public parent: ColumnBuilderComponent){
    
    this.fields = parent.fields;
  }

  ngOnInit() {


  }



  public edit_column_definition(cdef_id){
    /*
    THIS METHOD WILL HOPEFULLY NOT BE USED
    */ 


}

  public setFieldChoosen(){
    console.log('choosen: ' + this.choosen);
    this.data_field.next(this.fields!![this.choosen]);
  }

  public onGotFocusNameInput(){


  }

  public onLostFocusNameInput(){


  }



}
