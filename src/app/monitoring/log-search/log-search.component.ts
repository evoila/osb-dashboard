import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hits } from '../model/search-response';
import { Observable } from 'rxjs/Observable';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'sb-log-search',
  templateUrl: './log-search.component.html',
  animations: [
    trigger('flyInOut', [
      state('notReversed, reversed', style({transform: 'translateX(0)'})),
     transition('void => notReversed', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('reversed => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ]),
      transition('notReversed => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ]),
      transition('void => reversed', [
        style({transform: 'translateX(100%)'}),
        animate(100)
      ]),
    ])
  ],
  styleUrls: ['./log-search.component.scss']
})
export class LogSearchComponent implements OnInit {

  @Input('hits')
  hits: Observable<Hits>;
  @Input('pagination')
  pagination: number;

  public direction: reversed = 'notReversed';

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
    this.direction = goForward ? 'notReversed' : 'reversed';
    this.results.hits = [];
    goForward ? this.more.emit([20, false]) : this.more.emit([-20, false]);
    this.isCollapsed = [];
  }
  getObjectEntries(object: any): Array<[string, string]> {
    return Object.entries(object);
  }
}

type reversed = 'reversed'| 'notReversed';
