import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { SearchRequest, TimeRange } from '../../model/search-request';
import { ServiceBinding } from '../../model/service-binding';
import { Hits, SearchResponse } from '../../model/search-response';
import * as moment from 'moment/moment';
import { Subject, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { NotificationService, NotificationType, Notification } from '../../../core/notification.service';

@Component({
  selector: 'sb-search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.scss']
})
export class SearchLogsComponent implements OnInit {
  scope: ServiceBinding;
  query: string;

  //number of elements per request
  size = 100;

  fromDate: any = moment().subtract(30, "days").unix();
  toDate: any = moment().unix();
  hits: Hits;

  /* Timestamp of the last request Important for pagination cause search results might 
  grow continuesly which would lead to broken indeces
 */
  lastRequestTimeStamp: number;


  hitsSubject = new Subject<Hits>();
  hits$ = new Observable<Hits>(k => this.hitsSubject.subscribe(k));

  page: number;

  constructor(
    private searchService: SearchService,
    private notification: NotificationService) { }

  ngOnInit() {
  }

  setScope(event: ServiceBinding) {
    this.scope = event;
  }
  flick(page: number) {
    this.page = page;
    this.tooglePageNavigation();
  }

  search() {
    const request = this.buildSearchRequest();
    this.lastRequestTimeStamp = moment().unix();
    this.page = 0;
    this.fireRequest(request).subscribe((data: SearchResponse) => {
      this.hits = data.hits
      this.hitsSubject.next(this.hits);
    });
  }

  private tooglePageNavigation() {
    const request = this.buildSearchRequest(this.page * this.size);
    this.fireRequest(request).subscribe((data: SearchResponse) => {
      this.hits = data.hits
      this.hitsSubject.next(this.hits);
    });
  }

  private buildSearchRequest(from = 0): SearchRequest {

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
    searchRequest.range.to = this.toDate ? moment.unix(this.toDate).valueOf() : undefined;
    searchRequest.range.from = this.fromDate ? moment.unix(this.fromDate).valueOf() : undefined;

    return searchRequest;
  }
  private fireRequest(request: SearchRequest): Observable<SearchResponse> {
    return this.searchService.getSearchResults(request).pipe(
      tap((data: SearchResponse) => {
        if (!data.timed_out && data.hits.total !== 0) {
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
