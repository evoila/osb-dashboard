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
import { SearchService } from 'app/monitoring/shared/services/search.service';
import { Store } from '@ngrx/store';
import { RUN_QUERY, RunQuery } from '../../store/actions/query.action';
import { getQueryRunResult } from '../../store/reducers/query.reducer';
import { getQueriesState } from '../../store';



@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {
  @ViewChild('queryDropdownSelect') queryDropdownSelect: QuerySelectComponent;

  scope: ServiceBinding | null = null;
  query: ESQuery | null = null;
  selected_query_name?: string = "";
  hit_count: number = 0; 
  // flag indicating if current selected combination of scope and es-query is proofed valid
  valid = false;
  // id of this base-query-input row 
  base_query_ui_id: number = 0;


  
  @Output('open-query-editor')
  open_query_editor = new EventEmitter<number>();

  constructor(
    private store: Store<ESQuery>,
    private searchService: SearchService,
    
    //private notificationService: NotificationService
    ) {}

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
    
    console.log('testing query-scope-combi!');
    
    this.store.dispatch(new RunQuery(query, binding));
    this.store.select(getQueriesState).pipe(filter(k => !k.queries.running)).pipe(take(1)).subscribe(k => {
      var esbq_run_result = k.queries.run_result;
      if (esbq_run_result != null){
        this.valid = true;
        this.hit_count = +esbq_run_result.responses[0].hits.total; // + operator converting string to number
        console.log('hits: ' + this.hit_count);
      }
      else{
        this.valid = false;
      }
      console.log(esbq_run_result);
      //console.log(JSON.stringify(esbq_run_result));
    })
   

/*
    
    return this.searchService.run(query, binding).pipe(
      tap((data: any) => {

        
      })
    ).subscribe(k => {
      
      //var total_hits = k.hits.total;
      
      console.log(k);
    
    });

*/
    
  }

  
  showQueryEditor(){
    // event output to parent component (query-group-component) which will forward event to grandparent (table-editor-component) 
    this.open_query_editor.next(this.base_query_ui_id);
  }


  
  received_query_editor_result_query(query: ESQuery){
    console.log('base query 1 received result');
    
  }
 
  



}
