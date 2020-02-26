// this component represents a single ES Query and the ability to create/select & test it

import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { QueryGroupComponent } from '../query-group/query-group.component';
import { TableEditorComponent } from '../../containers/table-editor/table-editor.component';
import { tap, filter, take, map } from 'rxjs/operators';
import { NotificationService, Notification, NotificationType } from '../../../../core/notification.service';
import { ESQueryService } from '../../services/es-query.service';
import { ServiceBinding } from '../../../model/service-binding';
import { ESQuery } from '../../model/es-query';
import { QuerySelectComponent } from '../query-select/query-select.component';

@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {


  scope: ServiceBinding | null = null;
  query: ESQuery | null = null;
  selected_query_name?: string = "";
  // flag indicating if current selected combination of scope and es-query is proofed valid
  valid = false;
  // id of this base-query-input row 
  base_query_ui_id: number = 0;


  
  @Output('open-query-editor')
  open_query_editor = new EventEmitter<number>();

  constructor(
    private esQueryService: ESQueryService, 
    private notificationService: NotificationService
    ) {}

  ngOnInit() {
       
  }

  // user did select an app binding via drop down
  did_select_scope(service_binding: ServiceBinding){
    console.log('did select scope');
    this.scope = service_binding;
    this.validate_new_selection();
  }

  // user did select a persisted or newly created es-query via drop down select
  did_select_query(es_query: ESQuery){
    console.log('did select query');
    this.query = es_query;
    this.validate_new_selection();
  }


  validate_new_selection(){
    if (this.scope && this.query){
      this.test_query_with_binding(this.query, this.scope)
    }
  }
  
 
  test_query_with_binding(query: ESQuery, binding: ServiceBinding){
    
    console.log('testing query-scope-combi!');
    return; // test endpoint not axisting yet
    return this.esQueryService.testESQueryWithScope(query, binding).pipe(
      tap((data: boolean) => {
        if (!data) {
          const errorMsg = "query validation failed, CHECK YOUR REQUEST";
          console.error(errorMsg);
          this.notificationService.addSelfClosing(new Notification(NotificationType.Error, errorMsg, undefined));
        }
        else{
          this.valid = data;
        }
      })
    );
  }

  
  showQueryEditor(){
    // event output to parent component (query-group-component) which will forward event to grandparent (table-editor-component) 
    this.open_query_editor.next(this.base_query_ui_id);
  }


  
  received_query_editor_result_query(query: ESQuery){
    this.selected_query_name = query.name;
  }
 
  



}
