// this component represents a single ES Query and the ability to create/select & test it

import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { QueryGroupComponent } from '../query-group/query-group.component';
import { TableEditorComponent } from '../../containers/table-editor/table-editor.component';
import { ServiceBinding } from '../../../model/service-binding';
import { ESQuery } from '../../model/es-query';

@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {
  


  scope: ServiceBinding | null = null;
  query: ESQuery | null = null;

  // id of this base-query-input row 
  base_query_ui_id: number = 123;


  
  @Output('open-query-editor')
  open_query_editor = new EventEmitter<number>();

  constructor() {
    
  }

  ngOnInit() {
       
  }

  // user did select an app binding via drop down
  did_select_scope(service_binding: ServiceBinding){
    this.scope = service_binding;
    this.validate_new_selection();
  }

  // user did select a persisted or newly created es-query via drop down select
  did_select_query(es_query: ESQuery){
    this.query = es_query;
    this.validate_new_selection();
  }


  validate_new_selection(){
    if (this.scope && this.query){
      this.test_query_with_binding(this.query, this.scope)
    }
  }
  
 
  test_query_with_binding(query: ESQuery, binding: ServiceBinding){


  }

  
  showQueryEditor(){
    // event output to parent component (query-group-component) which will forward event to grandparent (table-editor-component) 
    this.open_query_editor.next(this.base_query_ui_id);
  }


  

 
  



}
