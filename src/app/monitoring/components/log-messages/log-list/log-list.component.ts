import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hits } from 'app/monitoring/model/search-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
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
  constructor() {

  }

  ngOnInit() {
    if (this.searchResponse) {
      this.searchResponse.subscribe(data => {
        this.code = '';
        this.hits = { ...data };
        if (this.hits.hits) {
          this.hits.hits.forEach(hit => {
            this.code += hit._source.logMessage + '\n';
          });
        }
      })
    } else {
      //TODO: Error-Message
    }
  }
  debug() {
    console.log(this.code);
  }
  public loadMore() {
    this.more.emit([100, true]);
  }
}
