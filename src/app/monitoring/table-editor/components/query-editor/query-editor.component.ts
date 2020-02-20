// this component is the full page container offering the Possibility to create a valid es Query
// before saving an ES Query it's possible to validate it with different App Bindings

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ESQuery } from '../../model/es-query';

@Component({
  selector: 'sb-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {

  @Output('close-query-editor')
  close_query_editor = new EventEmitter<ESQuery>();
  
  @Output('save-new-query')
  save_new_query = new EventEmitter();

  // while constructing
  query: ESQuery;
  // not null after successfull query-editor-query-test
  valid_query: ESQuery;


  constructor() { }

  ngOnInit() {
  }


  cancel_query_editor(){
    this.close_query_editor.next();
  }


  save_query(){
    console.log('SAVE QUERY TO DB HERE AND EXPORT IT TO Parent Component (table-editor)');
    this.save_new_query.next(this.valid_query);
    this.cancel_query_editor();
  }

  



}
