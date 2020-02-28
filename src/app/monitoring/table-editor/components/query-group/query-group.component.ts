// this component represents a group of selected and test-confirmed queries
// and offers the possibility to add another query

import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseQueryInputComponent } from '../base-query-input/base-query-input.component';
import { ESQuery } from '../../model/es-query';

@Component({
  selector: 'sb-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.scss']
})
export class QueryGroupComponent implements OnInit {
  @ViewChild('baseQuery1') baseQuery1: BaseQueryInputComponent;

  @Output('open-query-editor-forward')
  open_query_editor_forward = new EventEmitter<number>();


  // dict { id : component } holding unknown number child components
  //base_query_components = [this.baseQuery1];

  constructor() { }

  ngOnInit() {


  }

  // received open-query-editor-event from child (base-query-input) forwarding it to parent (table-editor)
  open_query_editor(base_query_id: number){
    console.log(base_query_id);
    this.open_query_editor_forward.next(base_query_id);
  }

  
  receive_query_editor_result_query(query: ESQuery, base_query_id: number){
    console.log(base_query_id);
    //this.base_query_components[0]
    this.baseQuery1.received_query_editor_result_query(query)
  }



}
