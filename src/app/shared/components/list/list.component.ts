import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() rows: Array<any>;
  @Input() headers: Array<String>;

  constructor() { }

  ngOnInit(): void {
  }

}
