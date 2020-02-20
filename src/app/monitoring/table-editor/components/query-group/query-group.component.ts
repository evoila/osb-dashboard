// this component represents a group of selected and test-confirmed queries
// and offers the possibility to add another query

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.scss']
})
export class QueryGroupComponent implements OnInit {


  @Output('open-query-editor-forward')
  open_query_editor_forward = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {


  }

  // received open-query-editor-event from child (base-query-input) forwarding it to parent (table-editor)
  open_query_editor(base_query_id: number){
    this.open_query_editor_forward.next(base_query_id);
  }




}
