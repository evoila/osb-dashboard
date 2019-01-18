import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {
  @Input('charts')
  public charts$: Observable<Array<Chart>>;

  constructor() {}

  ngOnInit() {}
}
