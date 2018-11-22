import { Component, OnInit } from '@angular/core';
import { BindingsState } from 'app/monitoring/chart-configurator/store/reducers/binding.reducer';
import { Store } from '@ngrx/store';
import { LoadBindings } from 'app/monitoring/chart-configurator/store';

@Component({
  selector: 'sb-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})
export class BaseChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
