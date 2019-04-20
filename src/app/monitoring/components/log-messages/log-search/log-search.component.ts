import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hits } from '../../../model/search-response';
import { Observable } from 'rxjs';

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
      state('notReversed, reversed', style({ transform: 'translateX(0)' })),
      transition('void => notReversed', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('reversed => void', [
        animate(100, style({ transform: 'translateX(-100%)' }))
      ]),
      transition('notReversed => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ]),
      transition('void => reversed', [
        style({ transform: 'translateX(100%)' }),
        animate(100)
      ])
    ])
  ],
  styleUrls: ['./log-search.component.scss']
})
export class LogSearchComponent implements OnInit {
  @Input('hits')
  hits$: Observable<Hits>;
  @Input('pagination')
  page: number;

  @Input('steps')
  public steps: number;

  public pages: number;


  public direction: reversed = 'notReversed';

  // array containing the Interval of Pages that should be visible in navigation
  pageInterval: Array<number>;

  // the Number says how many search Results should be displayed
  // the boolean Value says if previous results should be stored
  @Output('more')
  more = new EventEmitter<number>();
  results: Hits;
  isCollapsed: Array<boolean> = [];

  constructor() { }
  collapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
  setInterval() {
    this.pageInterval = [];
    const intervalStart = this.page - 5 >= 0 ? this.page - 5 : 0;
    for (let i = intervalStart; i < this.page + 5 && i < this.pages; i++) {
      this.pageInterval[i - intervalStart] = i;
    }
  }
  ngOnInit() {
    this.hits$.subscribe(data => {
      this.results = data;
      if (this.steps) {
        this.pages = Math.floor(data.total / this.steps);
        this.setInterval();
      }
    });
  }
  loadMore(page: number, goForward: boolean) {
    this.direction = goForward ? 'notReversed' : 'reversed';
    this.results.hits = [];
    goForward ? this.more.emit(page) : this.more.emit(page);
    this.isCollapsed = [];
  }
  getObjectEntries(object: any): Array<[string, string]> {
    return Object.entries(object);
  }
}

type reversed = 'reversed' | 'notReversed';
