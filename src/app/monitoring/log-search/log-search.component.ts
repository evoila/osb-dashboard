import { Component, OnInit, Input, Output, } from '@angular/core';
import { SearchResponse } from '../model/search-response';

@Component({
  selector: 'sb-log-search',
  templateUrl: './log-search.component.html',
  styleUrls: ['./log-search.component.scss']
})
export class LogSearchComponent implements OnInit {

  @Input()
  results: Array<SearchResponse>;
  isCollapsed: Array<boolean> = [];

  constructor() { }
  collapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
  ngOnInit() {

  }

}
