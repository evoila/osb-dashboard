// this component lets the user define table columns
// from the data returned by the all valid queries via query-group component 

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-column-builder',
  templateUrl: './column-builder.component.html',
  styleUrls: ['./column-builder.component.scss']
})
export class ColumnBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
