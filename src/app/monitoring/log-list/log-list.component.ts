import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hits } from 'app/monitoring/model/search-response';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'sb-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  @Input('searchResponse')
  searchResponse: Observable<Hits>;
  hits: Hits;
  @Output('more')
  public loadEmitter = new EventEmitter();
  logs: Array<String> = [];
  constructor() { }

  ngOnInit() {
    if (this.searchResponse) {
      this.searchResponse.subscribe(data => {
        this.logs = [];
        this.hits = data;
        data.hits.forEach(hit => {
          this.logs = [...this.logs, hit._source.logMessage];
        });
      })
    } else {
      //TODO: Error-Message
    }
  }
  public loadMore() {
    this.loadEmitter.emit();
  }
}
