// this component represents a single ES Query and the ability to create/select & test it

import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { QueryGroupComponent } from '../query-group/query-group.component';
import { TableEditorComponent } from '../../containers/table-editor/table-editor.component';

@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {
  


  //scope: ServiceBinding = {} as ServiceBinding;
  
  // after set via dropdown-select or query-editor component,
  // ..query's name gets displayed and it gets automatically tested with selected app binding
  query: string;
  // id of this base-query-input row 
  base_query_ui_id: number = 123;
  
  @Output('open-query-editor')
  open_query_editor = new EventEmitter<number>();

  constructor() {
    
  }

  ngOnInit() {

  }

  setScope(event){

    console.log('set scope here');

  }
  

  // open ES Query Editor Container
  showQueryEditor(){
    // event output to parent component (query-group-component) which will forward event to grandparent (table-editor-component) 
    this.open_query_editor.next(this.base_query_ui_id);
  }

  // dud select a persisted elastic search query from db via drop down select
  did_select_query(es_query){
    

  }


}
