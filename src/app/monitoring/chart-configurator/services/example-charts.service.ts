import { Injectable } from '@angular/core';
import * as chartTypes from '../model/chart-types';

@Injectable({
  providedIn: 'root'
})
export class ExampleChartsService {
  constructor() {}

  public getChartObject(chartType: string) {
    return chartTypes.chartObjectForType[chartType];
  }
}
