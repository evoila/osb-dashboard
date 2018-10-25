import { Injectable } from '@angular/core';
import { ChartResponse } from './model/chart-response';
import { Chart } from './model/chart';
import { JsonPipe } from '@angular/common/';
import { DateFormatPipe } from 'app/monitoring/pipe/date-format.pipe';



@Injectable()
export class PromChartingService {
  first: boolean; //saves if this is the first bucket of the dataset to save labels 
  constructor() { }

  public constructChart(promChartResponses: Array<any>, promChartQuery: Array<any>, chart: Chart): Chart {
    this.first = true;
    const promChartResponse: any = promChartResponses.filter(x => x.status === 'success').map(x => x.data).
      map(x => x.result).forEach((result, index) => {
        result.forEach(element => {
          chart = this.addSeries(element, chart, promChartQuery[index]);
          this.extractData(element.values, chart);
        });
      });
    console.log(promChartResponse);
    return chart;
  }
  private addSeries(result: any, chart: Chart, query: any): Chart {
    let seriesString = new JsonPipe().transform(result['metric']).replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    if (query.queryName) {
      seriesString += '(' + query.queryName + ')';
    }
    if (!chart['series']) {
      chart['series'] = [seriesString];
    } else {
      chart['series'] = [...chart['series'], seriesString]
    }
    return chart;
  }
  private extractData(values: Array<Array<any>>, chart: Chart): Chart {
    let tempData = [];
    values.forEach(element => {
      if (this.first) {
        if (!chart.labels) {
          chart.labels = [new DateFormatPipe().transform(element[0])];
        } else {
          chart.labels = [...chart.labels, new DateFormatPipe().transform(element[0])];
        }
      }
      tempData = [...tempData, element[1]];
    });
    if (chart.data) {
      chart.data = [...chart.data, [...tempData]];
    } else {
      chart.data = [[...tempData]];
    }
    this.first = false;
    return chart;
  }
}
