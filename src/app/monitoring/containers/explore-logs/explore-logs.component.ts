import { Component, OnInit } from '@angular/core';
import { Filter } from 'app/monitoring/model/filter';
import { ServiceBinding } from '../../model/service-binding';
import { SearchRequest, TimeRange } from '../../model/search-request';
import { SearchService } from '../../shared/services/search.service';
import { Hits, SearchResponse } from '../../model/search-response';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap, filter, timestamp } from 'rxjs/operators';
import { NotificationService, Notification, NotificationType } from '../../../core/notification.service';
import * as moment from 'moment/moment';
import { TimeService } from '../../shared/services/time.service';

@Component({
  selector: 'sb-explore-logs',
  templateUrl: './explore-logs.component.html',
  styleUrls: ['./explore-logs.component.scss']
})
export class ExploreLogsComponent implements OnInit {
  fromDate: any = moment().subtract(2, "days").unix();
  toDate: any = moment().unix();
  filter: Filter;
  scope: Partial<ServiceBinding> = {};
  hits: Hits;

  loadingSubject = new Subject<boolean>();
  loading$ = new Observable<boolean>(k => this.loadingSubject.subscribe(k));

  showFilter = false;

  hitsSubject = new Subject<Hits>();
  hits$ = new Observable<Hits>(k => this.hitsSubject.subscribe(k));


  // needed for the scoping component as an input
  appId: string;

  // General Configs 
  // number of entries that are polled 
  size = 5000

  lastRequestTimeStamp: number;

  // in a request where not all the data is fetched you need a pointer to the index
  // of the last request you made
  requestPointer: number = 0;

  constructor(
    private searchService: SearchService,
    private notification: NotificationService,
    private timeService: TimeService) { }

  ngOnInit() {
  }

  fireSearchRequest() {
    const request = this.buildSearchRequest();
    this.lastRequestTimeStamp = moment().unix();
    this.requestPointer = 0;
    this.fireRequest(request).subscribe((data: SearchResponse) => {
      this.loadingSubject.next(false);
      this.hits = data.hits
      this.hitsSubject.next(this.hits);
    });
  }

  appendLogs() {
    this.toDate = this.toDate ? this.toDate : this.lastRequestTimeStamp;
    this.requestPointer += 300;
    const request = this.buildSearchRequest(this.requestPointer);
    this.fireRequest(request).subscribe((data: SearchResponse) => {
      this.loadingSubject.next(false);
      this.hits.hits = [...this.hits.hits, ...data.hits.hits];
      this.hitsSubject.next(this.hits);
    })
  }

  updateFilters(filter: Filter) {
    this.filter = filter;
  }
  setToDate(toDate: Number) {
    this.toDate = toDate;
  }
  setFromDate(fromDate: Number) {
    this.fromDate = fromDate;
  }
  setScope(scope: ServiceBinding) {
    this.scope = scope;
    this.appId = scope.appId;
  }

  private buildSearchRequest(from = 0): SearchRequest {

    let searchRequest = {
      appName: this.scope.appName,
      space: this.scope.space,
      orgId: this.scope.organization_guid,
      filter: this.filter,
      docSize: {
        from,
        size: this.size
      }
    } as SearchRequest;


    searchRequest.range = new TimeRange();
    searchRequest.range.to = this.toDate ? this.timeService.convertUnixToNumerical(this.toDate) : undefined;
    searchRequest.range.from = this.fromDate ? this.timeService.convertUnixToNumerical(this.fromDate) : undefined;

    return searchRequest;
  }
  private fireRequest(request: SearchRequest): Observable<SearchResponse> {
    this.loadingSubject.next(true);
    return this.searchService.getSearchResults(request).pipe(
      tap((data: SearchResponse) => {
        if (!data.timed_out && data.hits.total === 0) {
          this.loadingSubject.next(false);
          this.notification.addSelfClosing(
            new Notification(
              NotificationType.Info,
              'No Data. Check your request.'
            )
          )
        }
      }),
      filter((data: SearchResponse) => !data.timed_out && data.hits.total !== 0)
    );
  }
}
