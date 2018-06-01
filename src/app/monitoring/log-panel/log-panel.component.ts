import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { SearchService } from '../search.service';
import { SearchRequest } from 'app/monitoring/model/search-request';
import { Hits } from 'app/monitoring/model/search-response';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { query } from '@angular/core/src/animation/dsl';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators';
import { TimeRange } from '../model/search-request';
import { LogDataModel } from '../model/log-data-model';
import { expand } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/empty';
import { timestamp } from 'rxjs/operators/timestamp';


@Component({
  selector: 'sb-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  public appId: string;
  public query: string;
  public toDate: any;
  public fromDate: any;
  public filter: Array<any> | null;
  public hits: Hits | null;
  public logEmitter: any;
  public searchEmitter: any;
  public observableHits: Observable<Hits> = Observable.create(e => this.logEmitter = e);
  public observableSearchResults: Observable<Hits> = Observable.create(e => this.searchEmitter = e);
  private from = 0;
  private isSequel = false;
  public fromDateView: any;
  public toDateView: any;
  // Streaming Mode which polls Log-Messages
  public isStreaming = false;
  public showFilter = true;
  private pollData: Observable<number> | null;
  private subscription: Subscription | null;
  private numOfLogs = 300;
  private triggerEmitter: any;
  private timestamp: Observable<number | null> | null = null;


  constructor(
    private searchService: SearchService
  ) { }
  ngOnInit() {
    /*this.toDate = moment().valueOf();
    this.fromDate = moment().subtract(10, 'days').valueOf();*/
  }

  setAppId(appId: string) {
    this.appId = appId;
    console.log(this.appId);
  }
  mode(isStreaming: boolean) {
    this.isStreaming = isStreaming;
  }
  more(eventPair: [number, boolean]) {
    if (!this.isStreaming) {
      this.isSequel = eventPair[1];
      this.from += eventPair[0];
      this.getLogs();
    }
  }
  search() {
    if (this.isStreaming) {
      this.timestamp = Observable.create(e => this.triggerEmitter = e);
      this.subscription = this.timestamp!!.subscribe((ts: null | number) => { this.pollLogs(ts) });
      this.pollLogs(null);
      this.isSequel = true;
      this.from = 0;
      this.hits = null;
    } else {
      this.pollData = null;
      this.isSequel = false;
      this.subscription && this.subscription!!.unsubscribe();
      this.from = 0;
      this.hits = null
      this.isSequel = false;
      this.getLogs();
    }
  }
  updateFilters(filters: Array<Map<string, any>>) {
    this.filter = filters.map(k => {
      const obj = Object.create(null);
      obj[k[0]] = k[1];
      return { 'match': obj }
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
      appId: this.appId,
      filter: this.filter,
      docSize: {
        from: this.from,
        size: size
      }
    } as SearchRequest;
    if (this.fromDate && this.toDate) {
      searchRequest.range = {
        from: this.fromDate,
        to: this.toDate
      } as TimeRange
    }
    return searchRequest;
  }

  pollLogs(ts: number | null) {
    if (this.appId && !this.query) {
      const request: SearchRequest = this.buildSearchRequest(200);
      if (ts) {
        request.range = {
          from: ts
        } as TimeRange;
      }
      this.performRequest(request, false, true).subscribe(k => {
        if (k) {
          this.triggerEmitter.next(k);
        } else {
          this.triggerEmitter.next(ts);
        }
      });
    }
  }

  getLogs() {
    if (this.appId) {
      if (!this.query) {
        const request: SearchRequest = this.buildSearchRequest(100);
        this.performRequest(request, false).subscribe();
      } else {
        const request = this.buildSearchRequest(20);
        request.query = this.query;
        this.performRequest(request, true).subscribe();
      }
    }
  }
  trimResults(append: boolean, trimSize: number) {
    if (append) {
      this.hits!!.hits = this.hits!!.hits.filter((k: LogDataModel, index: number) => index > trimSize);
    } else {
      this.hits!!.hits = this.hits!!.hits.filter((k: LogDataModel, index: number) => index < this.numOfLogs - trimSize);
    }
  }
  // Append Property specifies wether fresh logmessages are appended or prepended
  // Older Logs are prepended -- Newer Logs are appended
  private performRequest(request: SearchRequest, isSearch: boolean, append: boolean = false): Observable<number | null> {
    return this.searchService.getSearchResults(request).map(data => {
      if (!data.timed_out) {
        if (data.hits.total === 0) {
          // TODO: No Data Message
          return null;
        } else {
          // Reverse Array to have oldest entrie first
          const ts = data.hits.hits[0]['_source'].timestamp
          data.hits.hits = data.hits.hits.slice().reverse();
          if (this.hits && this.isSequel && !append) {
            this.hits.hits = [...data.hits.hits, ...this.hits.hits];
          } else if (this.hits && this.isSequel && append) {
            this.hits.hits = [...this.hits.hits, ...data.hits.hits];
          } else {
            this.hits = data.hits;
          }
          if (!isSearch) {
            this.logEmitter.next(this.hits);
          } else {
            this.searchEmitter.next(this.hits);

          }
          const sizeLimit = this.hits ? this.hits.hits.length > this.numOfLogs : false;
          if (sizeLimit) {
            const trimSize = this.hits!!.hits.length - this.numOfLogs;
            this.trimResults(append, trimSize);
          }
          return ts;
        }
      } else {
        // TODO: Error Message
        return null;

      }
    });
  }
}
