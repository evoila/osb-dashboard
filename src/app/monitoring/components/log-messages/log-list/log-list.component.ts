import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Hits } from 'app/monitoring/model/search-response';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sb-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit, OnDestroy {
  @Input('searchResponse')
  searchResponse: Observable<Hits>;
  @Input('isStreaming')
  isStreaming: boolean;
  @Input('inRequest')
  inRequest: boolean;
  hits: Hits;
  @Output('more')
  public more = new EventEmitter<[number, boolean]>();
  editorOptions = { readOnly: true, language: 'javascript' };
  code: string;
  logs: Array<String> = [];

  subscription: Subscription;
  constructor() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    if (this.searchResponse) {
      this.subscription = this.searchResponse.subscribe(data => {
        this.code = '';
        this.hits = { ...data };
        if (this.hits.hits) {
          this.hits.hits.forEach(hit => {
            this.code += hit._source.logMessage + '\n';
          });
        }
      })
    }
  }
  public loadMore() {
    this.more.emit([100, true]);
  }
}
