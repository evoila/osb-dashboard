
    /*
  {
    "should": [],
    "filter": [],
    "mustNot": [],
    "must": [
      {
        "match": {
          "_index": "*-logmessages"
        }
      }
    ]
  } 
  */    


// this component is the full page container offering the Possibility to create a valid es Query
// before saving an ES Query it's possible to validate it with different App Bindings

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ESQuery } from '../../model/es-query';
import { RawQuery } from '../../model/raw-query';

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

  //raw query + name & id
  query: ESQuery;
  // not null after successfull query-editor-query-test
  valid_query: RawQuery;


  constructor() { }

  ngOnInit() {

        var must_val = [{'match' : { '_index' : '*-logmessages'} }] 
        var raw_query = new RawQuery([], [], [], must_val)
        this.query = new ESQuery(123, 'nice query', raw_query)

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
