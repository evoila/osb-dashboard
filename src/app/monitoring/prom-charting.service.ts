import { Injectable } from '@angular/core';
import { ChartResponse } from './model/chart-response';
import { Chart } from './model/chart';


@Injectable()
export class PromChartingService {

  constructor() { }

  public constructChart(promChartResponses: Array<any>, chart: Chart) {
    promChartResponses.filter(x => x.status === 'success').map(x => x.result)
      .forEach(result => {
        chart = this.addSeries(result, chart);
        this.extractData(result.values, chart);
      });
      return chart;
  }
  private addSeries(result: any, chart: Chart): Chart {
    const seriesString = result['metric']['_name__'] + result['metric']['instance'] + result['metric']['job']
    if (chart['series']) {
      chart['series'] = [seriesString];
    } else {
      chart['series'] = [...chart['series'], seriesString]
    }
    return chart;
  }
  private extractData(values: Array<Array<any>>, chart: Chart): Chart {
    values.forEach(element => {
      if (chart.data || chart.labels) {
        chart.labels = element[0];
        chart.data = element[1];
      } else {
        chart.data = [...chart.data, element[1]];
        chart.labels = [...chart.labels, element[0]];
      }
    });
    return chart;
  }
}
