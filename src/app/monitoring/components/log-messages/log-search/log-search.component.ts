import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Hits } from '../../../model/search-response';
import { Observable, Subscription } from 'rxjs';
import { ShortcutService } from '../../../../core/services/shortcut.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { tap, debounceTime, filter } from 'rxjs/operators';
import { LogDataModel } from 'app/monitoring/model/log-data-model';

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
export class LogSearchComponent implements OnInit, OnDestroy {
  @Input('hits')
  hits$: Observable<Hits>;
  @Input('pagination')
  page: number;

  @Input('steps')
  public steps: number;

  @Input('query') // the query text is passed to eventually highlight the search string in the resulting logmessages list
  queryText: string = "";

  @Input('inputFocus') // the query text is passed to eventually highlight the search string in the resulting logmessages list
  searchInputHasFocus: boolean = false;

  public pages: number;
  private hits$Subscription: Subscription;

  public direction: reversed = 'notReversed';

  showSingleLogContext = false;
  logContextSeed: LogDataModel;

  selectedRow : number;

  // array containing the Interval of Pages that should be visible in navigation
  pageInterval: Array<number>;

  // the Number says how many search Results should be displayed
  // the boolean Value says if previous results should be stored
  @Output('more')
  more = new EventEmitter<number>();
  results: Hits;
  isCollapsed: Array<boolean> = [];

  constructor(private shortcut: ShortcutService) { }
  collapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
    this.showSingleLogContext = false;
    this.selectedRow = -1;
  }

  ngOnDestroy() {
    this.hits$Subscription.unsubscribe();
  }
  ngOnInit() {
    this.hits$Subscription = this.hits$.subscribe(data => {
      this.results = data;
      if (this.steps) {
        this.pages = Math.floor(data.total / this.steps);
        this.setInterval();
      }
    });

    // This needs more refinment because this is a more complex topic because keydown is a blocking the ui
    // Whe a user stays on the arrow key we want to count up the pages but do just one request every 300 ms
    this.shortcut.bindShortcut({
      key: "ArrowLeft",
      description: "Navigate to previous page",
      view: "Search Logs View"
    }).pipe(filter(k => this.results != null && !this.searchInputHasFocus), tap(k => { // without this filter, left-arrow-key presses trigger pagination, even before search button was hit and results were displayed at all
      if (this.page - 1 >= 0) {
        this.page -= 1;
      } 
    }), debounceTime(300)).subscribe(k => {
      this.loadMore(this.page, false);
    });


    this.shortcut.bindShortcut({
      key: "ArrowRight",
      description: "Navigate to next page",
      view: "Search Logs View"
    }).pipe(filter(k => this.results != null && !this.searchInputHasFocus), tap(k => {
      // Whe a user stays on the arrow key we want to count up the pages but do just one request every 300 ms
      if (this.page + 1 <= this.pages) {
        this.page += 1;
      } 
    }), debounceTime(300)).subscribe(k => {
      this.loadMore(this.page, true);
    });
  }
  setInterval() {
    this.pageInterval = [];
    const intervalStart = this.page - 5 >= 0 ? this.page - 5 : 0;
    for (let i = intervalStart; i < this.page + 5 && i < this.pages; i++) {
      this.pageInterval[i - intervalStart] = i;
    }
  }
  loadMore(page: number, goForward: boolean) {
    this.direction = goForward ? 'notReversed' : 'reversed';
    if (this.results) {
      this.results.hits = [];
    }
    goForward ? this.more.emit(page) : this.more.emit(page);
    this.isCollapsed = [];
    this.selectedRow = -1;
    this.showSingleLogContext = false;
  }
  getObjectEntries(object: any): Array<[string, string]> {
    return Object.entries(object);
  }

  toggleLogContext(resultsHit: LogDataModel){ // single LogMessageObject to show context for
    this.logContextSeed = resultsHit;
    const i : number = this.results.hits.indexOf(resultsHit)
    this.selectedRow = this.showSingleLogContext ? -1 : i;
    this.showSingleLogContext = !this.showSingleLogContext;
    // decollapsing all other log-message-detail-lists when showing log message context for a specific log message
    // legacy program logic leeds to isCollaped-array always having length of the index of highest user-collapsed row
    this.isCollapsed = (Array<boolean>(i))
    this.isCollapsed.push(true)
  }



}

type reversed = 'reversed' | 'notReversed';
