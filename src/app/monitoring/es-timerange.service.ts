import { Injectable } from '@angular/core';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';

@Injectable()
export class EsTimerangeService {

  constructor() { }

  public setTimeRange(chartRequest: EsChartRequest, start: number, end: number): EsChartRequest {
    chartRequest.range = {
      'timestamp': {
        'gte': start * 1000,
        'lte': end * 1000
      }
    }
    return chartRequest;
  }

}
