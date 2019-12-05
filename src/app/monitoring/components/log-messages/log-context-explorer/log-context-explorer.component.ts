import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Hits, SearchResponse } from '../../../model/search-response';
import { Observable, Subscription, Subject } from 'rxjs';
import { ServiceBinding } from 'app/monitoring/model/service-binding';
import { LogListComponent } from '../log-list/log-list.component';
import { SearchRequest, TimeRange } from 'app/monitoring/model/search-request';
import { TimeService } from 'app/monitoring/shared/services/time.service';
import * as moment from 'moment/moment';
import { SearchService } from 'app/monitoring/shared/services/search.service';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'sb-log-context-explorer',
  templateUrl: './log-context-explorer.component.html',
  styleUrls: ['./log-context-explorer.component.scss']
})
export class LogContextExplorerComponent implements OnInit, OnDestroy {
  @ViewChild(LogListComponent) MonacoLogList;
    
  @Input('mainLogDate')
  centralLogDate : number;

  @Input('mainLogMsg')
  centralLogMsg : string;
  
  scope: Partial<ServiceBinding> = {};
  hits: Hits;
  lastRequestTimeStamp: number;
  loadingSubject = new Subject<boolean>();
  loading$ = new Observable<boolean>(k => this.loadingSubject.subscribe(k));

  hitsSubject = new Subject<Hits>();
  hits$ = new Observable<Hits>(k => this.hitsSubject.subscribe(k));
  
  
  

  // in a request where not all the data is fetched you need a pointer to the index
  // of the last request you made
  requestPointer: number = 0;

  constructor( private searchService: SearchService, private timeService: TimeService ) { }

  // number of entries that are polled 
  size = 50
  
  ngOnDestroy() {
    
  }

  ngOnInit() {
    console.log("ngOnInit() LogContextExplorerComponent");
    this.fireContextSearchRequest();
  }

  fireContextSearchRequest() {
      
    const request = this.buildContextSearchRequest();
    this.requestPointer = 0;
    this.fireRequest(request).subscribe((data: SearchResponse) => {
      this.loadingSubject.next(false);
      this.hits = data.hits
      this.hitsSubject.next(this.hits);
    });
  }


  // timerange from main log message to now    /// TO DO: build second request with time range before central log message
  private buildContextSearchRequest(from = 0): SearchRequest {

    let searchRequest = {
      appName: this.scope.appName,
      space: this.scope.space,
      orgId: this.scope.organization_guid,
      docSize: {
        from,
        size: this.size
      }
    } as SearchRequest;
    
    console.log(this.centralLogDate);
    searchRequest.range = new TimeRange(); 
    searchRequest.range.to = this.timeService.convertUnixToNumerical(moment().unix());
    searchRequest.range.from = this.timeService.convertUnixToNumerical(this.centralLogDate / 1000); // milliseconds to seconds

    return searchRequest;
  }



  private fireRequest(request: SearchRequest): Observable<SearchResponse> {
    this.loadingSubject.next(true);
    this.lastRequestTimeStamp = moment().unix();
    return this.searchService.getSearchResults(request).pipe(
      tap((data: SearchResponse) => {
        if (!data.timed_out && data.hits.total === 0) {
          console.log("no data found, CHECK YOUR REQUEST");
        }
      }),
      filter((data: SearchResponse) => !data.timed_out && data.hits.total !== 0)
    );
  }
  

  
}