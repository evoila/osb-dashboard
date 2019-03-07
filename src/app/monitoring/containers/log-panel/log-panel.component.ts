import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment/moment';
import { SearchService } from '../../shared/services/search.service';
import { SearchRequest } from 'app/monitoring/model/search-request';
import { Hits, SearchResponse } from 'app/monitoring/model/search-response';
import { Subscription, Observable } from 'rxjs';
import { TimeRange } from '../../model/search-request';
import { LogDataModel } from '../../model/log-data-model';
import {
  Notification,
  NotificationService
} from '../../../core/notification.service';
import { NotificationType } from 'app/core';
import { ServiceBinding } from '../../model/service-binding';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'sb-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit, OnDestroy {
  public appId: string;
  public space: string;
  public appName: string;
  public query: string;
  public toDate: any;
  public fromDate: any;
  public fixDate: any; // Timestamp needed to fix resultset for subsequent requests
  public filter: Array<any> | null;
  public hits: Hits | null;
  logEmitter: any;
  searchEmitter: any;
  public observableHits: Observable<Hits> = new Observable(
    e => (this.logEmitter = e)
  );
  public observableSearchResults: Observable<Hits> = Observable.create(
    emitter => (this.searchEmitter = emitter)
  );
  private from = 0;
  private isSequel = false;
  public fromDateView: any;
  public toDateView: any;
  // Streaming Mode which polls Log-Messages
  public isStreaming = false;
  public showFilter = true;
  private subscription: Subscription | null;
  private numOfLogs = 300;
  private triggerEmitter: any;
  private orgId: string;
  public timestamp: Observable<number | null> | null = null;
  public inRequest = false; // Status variable to lock button if there is an ongoing request

  constructor(
    private searchService: SearchService,
    private notification: NotificationService
  ) { }
  ngOnInit() { }

  ngOnDestroy() {
    this.stopStreaming();
    this.hits = null;
  }

  setApp(app: ServiceBinding) {
    console.log(app);
    this.appName = app.appName;
    this.space = app.space;
    this.orgId = app.organization_guid;
  }

  mode(isStreaming: boolean) {
    // Flush results and stop Stream on Context-Switch
    if (this.isStreaming && this.triggerEmitter) {
      this.stopStreaming();
    }
    this.hits = null;
    this.isStreaming = isStreaming;
  }
  more(eventPair: [number, boolean]) {
    if (!this.isStreaming) {
      // Check wether Timestamp is specified for sequential Request
      // Background: The Index of the visualized Data in the resultset changes whenever there
      // is new Data. Going Backwards results in loading the same set of Loads. Timestamp should be fixed till reload
      if (!this.toDate && !this.fixDate) {
        this.fixDate = this.hits
          ? this.hits.hits[0]['_source'].timestamp
          : undefined;
      }
      this.isSequel = eventPair[1];
      this.from += eventPair[0];
      this.getLogs();
    }
  }
  search() {
    this.fixDate = null; // new request clear sequential
    if (this.isStreaming) {
      // clear all data from previous requests
      this.stopStreaming();
      this.hits = null;
      this.startStreaming();
    } else {
      this.stopStreaming();
      this.hits = null;
      this.getLogs();
    }
  }

  startStreaming() {
    this.timestamp = Observable.create(e => (this.triggerEmitter = e));
    this.subscription = this.timestamp!!.subscribe((ts: null | number) => {
      this.pollLogs(ts);
    });
    this.isSequel = true;
    this.from = 0;
    this.hits = null;
    this.pollLogs(null);
  }

  stopStreaming() {
    this.timestamp = null;
    this.subscription && this.subscription!!.unsubscribe();
    this.from = 0;
    this.isSequel = false;
    this.inRequest = false;
  }

  updateFilters(filters: Array<Map<string, any>>) {
    this.filter = filters.map(k => {
      const obj = Object.create(null);
      obj[k[0]] = k[1];
      return { match: obj };
    });
    this.from = 0;
    this.isSequel = false;
    this.getLogs();
  }

  setFromDate(fromDate: number) {
    this.fromDate = fromDate * 1000;
  }
  setToDate(toDate: number) {
    this.toDate = toDate * 1000;
  }
  private buildSearchRequest(size: number): SearchRequest {
    const searchRequest = {
      appName: this.appName,
      space: this.space,
      filter: this.filter,
      orgId: this.orgId,
      docSize: {
        from: this.from,
        size: size
      }
    } as SearchRequest;

    searchRequest.range = new TimeRange();
    searchRequest.range.from = this.fromDate ? this.fromDate : undefined;
    searchRequest.range.to = this.toDate ? this.toDate : undefined;
    searchRequest.range.to =
      !this.toDate && this.fixDate ? this.fixDate : undefined;

    return searchRequest;
  }

  pollLogs(ts: number | null) {
    if (this.appName && this.space && !this.query) {
      const request: SearchRequest = this.buildSearchRequest(200);
      if (ts) {
        request.range = {
          from: ts
        } as TimeRange;
      }
      this.performRequest(request, false, false).subscribe(k => {
        if (k) {
          this.triggerEmitter.next(k);
        } else {
          setTimeout(() => {
            this.triggerEmitter.next(ts);
          }, 100);
        }
      });
    }
  }

  getLogs() {
    if (this.appName && this.space) {
      if (!this.query) {
        const request: SearchRequest = this.buildSearchRequest(100);
        if (this.isSequel && !this.isStreaming) {
          this.performRequest(request, false, true).subscribe(
            data => (this.inRequest = false)
          );
        } else {
          this.performRequest(request, false).subscribe(
            data => (this.inRequest = false)
          );
        }
      } else {
        const request = this.buildSearchRequest(20);
        request.query = this.query;
        this.performRequest(request, true).subscribe();
      }
    }
  }
  trimResults(append: boolean, trimSize: number) {
    if (append) {
      this.hits!!.hits = this.hits!!.hits.filter(
        (k: LogDataModel, index: number) => index > trimSize
      );
    } else {
      this.hits!!.hits = this.hits!!.hits.filter(
        (k: LogDataModel, index: number) => index < this.numOfLogs - trimSize
      );
    }
  }
  // Append Property specifies wether fresh logmessages are appended or prepended
  // Older Logs are prepended -- Newer Logs are appended
  private performRequest(
    request: SearchRequest,
    isSearch: boolean,
    append: boolean = false
  ): Observable<number | null> {
    if (!(this.hits && this.hits.hits && this.isStreaming)) {
      this.notification.addSelfClosing(
        new Notification(
          NotificationType.Info,
          'Request has been dispatched. Please stand by.'
        )
      );
      this.inRequest = true;
    }
    return this.searchService.getSearchResults(request).pipe(
      map((data: SearchResponse) => {
        if (!data.timed_out) {
          if (data.hits.total === 0) {
            if (!(this.hits && this.hits.hits && this.isStreaming)) {
              this.notification.addSelfClosing(
                new Notification(NotificationType.Warning, 'no Data')
              );
              if (this.isStreaming) {
                this.stopStreaming();
              }
            }
            return null;
          } else {
            // Reverse Array to have oldest entrie first
            const ts = data.hits.hits[0]['_source'].timestamp;
            const currTs = moment().valueOf();
            console.log(ts + ' : ' + currTs + ' delta : ' + (currTs - ts));
            if (this.hits && this.isSequel && !append) {
              data.hits.hits = data.hits.hits.slice().reverse();
              this.hits.hits = [...data.hits.hits, ...this.hits.hits];
            } else if (this.hits && this.isSequel && append) {
              this.hits.hits = [...this.hits.hits, ...data.hits.hits];
            } else if (this.hits && !this.isSequel && !append) {
              data.hits.hits = data.hits.hits.slice().reverse();
              this.hits = data.hits;
            } else {
              this.hits = data.hits;
            }
            if (!isSearch) {
              this.logEmitter.next(this.hits);
            } else {
              this.searchEmitter.next(this.hits);
            }
            const sizeLimit = this.hits
              ? this.hits.hits.length > this.numOfLogs
              : false;
            if (sizeLimit) {
              const trimSize = this.hits!!.hits.length - this.numOfLogs;
              this.trimResults(append, trimSize);
            }
            return ts;
          }
        } else {
          this.notification.addSelfClosing(
            new Notification(NotificationType.Warning, 'Request timed out')
          );
          return null;
        }
      })
    );
  }
}
