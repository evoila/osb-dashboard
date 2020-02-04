import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {


  // I think scope is needed for query
  //scope: ServiceBinding = {} as ServiceBinding;
  
  query: string;
  queryInputHasFocus = false;

  constructor() { }

  ngOnInit() {
  }


  onLostFocusQueryInput() {
    this.queryInputHasFocus = false;
  }

  onGotFocusQueryInput() {
    this.queryInputHasFocus = true;
  }


}
