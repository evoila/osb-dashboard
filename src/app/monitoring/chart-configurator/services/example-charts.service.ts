import { Injectable } from '@angular/core';
import * as chartTypes from '../model/chart-types';
import { ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ExampleChartsService {
  constructor() {}

  public getChartObject(chartType: string) {
    return chartTypes.chartObjectForType[chartType];
  }
  public generateChartFromTypeAndOptions(type: string, options: ChartOptions) {
    return { ...chartTypes.chartObjectForType[type], options: {...options} };
  }
}
