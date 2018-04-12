import { Component, OnInit } from '@angular/core';
import { EsChartRequest } from '../model/es-chart-request';

@Component({
  selector: 'sb-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  public chartRequest = new EsChartRequest()
  constructor() { }

  ngOnInit() {
    this.chartRequest.appId = '92acfbac-44e8-445e-8a8a-e04db954ff8c';
  }

}
