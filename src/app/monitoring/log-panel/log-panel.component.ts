import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { SearchService } from '../search.service';
import { SearchRequest } from 'app/monitoring/model/search-request';
import { Hits } from 'app/monitoring/model/search-response';
import { Observable } from 'rxjs/Observable';
import { query } from '@angular/core/src/animation/dsl';


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
  public observableSearchResults: Observable<Hits> = Observable.create(e => this.logEmitter = e);
  private from = 0;
  private isSequel = false;


  constructor(
    private searchService: SearchService
  ) { }
  ngOnInit() {
    this.toDate = moment().valueOf();
    this.fromDate = moment().subtract(10, 'days').valueOf();

  }

  setAppId(appId: string) {
    this.appId = appId;
    console.log(this.appId);
  }
  more() {
    this.isSequel = true;
    this.from += 100;
    this.getLogs();
  }
  search() {
    this.from = 0;
    this.isSequel = false;
    this.getLogs();
  }
  updateFilters (filters: Array<Map<string, any>>) {
    this.filter = filters.map( k => {
      let obj = Object.create(null);
      obj[k[0]] = k[1];
      return {'match': obj}
    });
    this.from = 0;
    this.isSequel = false;
    this.getLogs();
  }
  getLogs() {
    if (this.appId) {
      if (!this.query) {
        const request: SearchRequest = {
          range: {
            from: this.fromDate,
            to: this.toDate
          },
          appId: this.appId,
          filter: this.filter,
          docSize: {
            from: this.from,
            size: 100
          }
        } as SearchRequest;
        this.performRequest(request, false);
      } else {
        const request: SearchRequest = {
          range: {
            from: this.fromDate,
            to: this.toDate
          },
          appId: this.appId,
          filter: this.filter,
          docSize: {
            from: this.from,
            size: 100
          },
          query: this.query
        } as SearchRequest;
        this.performRequest(request, true);
      }
    }
  }
  private performRequest(request: SearchRequest, isSearch: boolean) {
    this.searchService.getSearchResults(request).subscribe(data => {
      if (!data.timed_out) {
        if (data.hits.total === 0) {
          //TODO: No Data Message
        }
        if (this.hits && this.isSequel) {
          this.hits.hits = [...this.hits.hits, ...data.hits.hits];
        } else {
          this.hits = data.hits;
        }
        if (!isSearch) {
          this.logEmitter.next(this.hits);
        } else {
          this.searchEmitter.next(this.hits);
        }
      } else {
        //TODO: Error Message
      }
    }
      , error => {
        //TODO: Error Message
      });
  }
}
