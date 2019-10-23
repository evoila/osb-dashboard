import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { SearchRequest, TimeRange } from '../../model/search-request';
import { ServiceBinding } from '../../model/service-binding';
import { Hits, SearchResponse } from '../../model/search-response';
import * as moment from 'moment/moment';
import { Subject, Observable } from 'rxjs';
import { tap, filter, catchError } from 'rxjs/operators';
import { NotificationService, NotificationType, Notification } from '../../../core/notification.service';
import { TimeService } from '../../shared/services/time.service';
import { ShortcutService } from '../../../core/services/shortcut.service';

@Component({
  selector: 'sb-search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.scss']
})
export class SearchLogsComponent implements OnInit {
  showFilter = false;
  scope: ServiceBinding = {} as ServiceBinding;
  query: string;
  public error: boolean = false;



  //number of elements per request
  size = 100;

  fromDate: any = moment().subtract(30, "days").unix();
  toDate: any = moment().unix();
  hits: Hits;

  // Boolean Subject that emits wether there is an ongoing request
  loadingSubject = new Subject<boolean>();
  loading$ = new Observable<boolean>(k => this.loadingSubject.subscribe(k));


  /* Timestamp of the last request Important for pagination cause search results might 
  grow continuesly which would lead to broken indeces
 */
  lastRequestTimeStamp: number;


  hitsSubject = new Subject<Hits>();
  hits$ = new Observable<Hits>(k => this.hitsSubject.subscribe(k));

  page: number;

  constructor(
    private searchService: SearchService,
    private notification: NotificationService,
    private timeService: TimeService,
    private shortcut: ShortcutService) { }

  ngOnInit() {
    this.shortcut.bindShortcut({
      key: "Enter",
      description: "Trigger Search Request",
      view: "Search Logs View"
    }).subscribe(k => {
      if (!this.buttonDisabled()) {
        this.search();
      }
    });
  }

  setScope(event: ServiceBinding) {
    this.scope = event;
  }
  flick(page: number) {
    this.page = page;
    this.tooglePageNavigation();
  }

  setToDate(event: any) {
    this.toDate = event;
  }

  setFromDate(event: any) {
    this.fromDate = event;
  }

  buttonDisabled() {
    // Function that determins wether the button 
    // should be disabled due to missing user input
    return !(Object.keys(this.scope).length && this.query)
  }
  search() {
    const request = this.buildSearchRequest(0, true);
    this.lastRequestTimeStamp = moment().unix();
    this.page = 0;
    this.error = false;

    this.fireRequest(request).subscribe((data: SearchResponse) => {

      this.hits = data.hits;
      this.hitsSubject.next(this.hits);
    }, (error) => {
      if (error && error.error && error.error.error) {
        // get forwarded elastic search error
        var ese = error.error.error;
        if (ese) {
          // this line makes an no-result hint show up on gui, telling the user to check his search input
          this.error = true;
          /* // detailled error information is not shown to the user, but it could easily be done
          const errorType :String = ese.failed_shards[0].reason.caused_by.caused_by.type;  
          const errorReason :String = ese.failed_shards[0].reason.reason;
          const errorReasonDetail :String = ese.failed_shards[0].reason.caused_by.caused_by.reason;
          */
        }
        else {
          // unknown problem
          // error thrown because of network- or infrastructure problems
        }
      }
    });
  }

  private tooglePageNavigation() {
    const request = this.buildSearchRequest(this.page * this.size, false);
    this.loadingSubject.next(true);
    this.fireRequest(request).pipe(catchError(err => {
      this.loadingSubject.next(false);
      return Observable.throw(err);
    })).subscribe((data: SearchResponse) => {
      this.hits = data.hits
      this.hitsSubject.next(this.hits);
      this.loadingSubject.next(false);
    });
  }

  private buildSearchRequest(from = 0, initialRequest: boolean): SearchRequest {

    let searchRequest = {
      appName: this.scope.appName,
      space: this.scope.space,
      orgId: this.scope.organization_guid,
      query: this.query,
      docSize: {
        from,
        size: this.size
      }
    } as SearchRequest;


    searchRequest.range = new TimeRange();

    /* Whenever a user chooses a date in the future his intention is to get the 
    newest possible entries. However when navigating through the pagination a date 
    in the future is harmfull because it destroys the pagination. Therefore we fix the
    initial request timestamp as newest possible log */

    if (!initialRequest && this.toDate > moment().unix()) {
      searchRequest.range.to = this.timeService.convertUnixToNumerical(this.lastRequestTimeStamp);
    } else {
      searchRequest.range.to = this.toDate ? this.timeService.convertUnixToNumerical(this.toDate) : undefined;
    }

    searchRequest.range.from = this.fromDate ? this.timeService.convertUnixToNumerical(this.fromDate) : undefined;

    return searchRequest;
  }
  private fireRequest(request: SearchRequest): Observable<SearchResponse> {
    return this.searchService.getSearchResults(request).pipe(
      tap((data: SearchResponse) => {
        if (!data.timed_out && data.hits.total === 0) {
          this.notification.addSelfClosing(
            new Notification(
              NotificationType.Info,
              'No Data. Check your request.'
            )
          );
          this.error = true;
        }
      }),
      filter((data: SearchResponse) => !data.timed_out && data.hits.total !== 0)
    );
  }


}
