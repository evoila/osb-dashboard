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
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = '';
  logs: Array<String> = [];
  constructor() { }

  ngOnInit() {
    if (this.searchResponse) {
      this.searchResponse.subscribe(data => {
        this.code = '';
        this.hits = data;
        data.hits.reverse().forEach(hit => {
          this.code += hit._source.logMessage + '\n';
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
