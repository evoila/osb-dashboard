import { Component, OnInit } from '@angular/core';

import * as chartTypes from '../model/chart-types';
import { Chart } from 'chart.js';
@Component({
  selector: 'sb-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  // use this with async pipe in Template options$ | asnyc
  public charts: Array<any> = [];

  ngOnInit() {
    let tempObject: any = {};
    Object.keys(chartTypes.chartObjectForType).forEach((k, index, array) => {
      tempObject = { ...tempObject, [k]: chartTypes.chartObjectForType[k] };
      if ((index + 1) % 2 == 0 || index + 1 === array.length) {
        this.charts = [...this.charts, { ...tempObject }];
        tempObject = {};
      }
    });
  }
  public chooseChart(chartName: string) {}
}
