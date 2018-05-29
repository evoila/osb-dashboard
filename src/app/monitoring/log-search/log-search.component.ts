import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hits } from '../model/search-response';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sb-log-search',
  templateUrl: './log-search.component.html',
  styleUrls: ['./log-search.component.scss']
})
export class LogSearchComponent implements OnInit {

  @Input('hits')
  hits: Observable<Hits>;
  @Input('pagination')
  pagination: number;

  // the Number says how many search Results should be displayed
  // the boolean Value says if previous results should be stored
  @Output('more')
  more = new EventEmitter<[number, boolean]>();
  results: Hits;
  isCollapsed: Array<boolean> = [];

  constructor() { }
  collapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
  ngOnInit() {
    this.hits.subscribe(data => this.results = data)
  }
  loadMore(goForward: boolean) {
    goForward ? this.more.emit([20, false]) : this.more.emit([-20, false]);
    this.isCollapsed = [];
  }
  getObjectEntries(object: any): Array<[string, string]> {
    return Object.entries(object);
  }
}
