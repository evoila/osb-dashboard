import { Injectable } from '@angular/core';
import { ChartType } from './model/chartType';


@Injectable()
export class ChartingUtilsService {
  constructor() {
  }

  chartTypes(): Array<ChartType> {
    return [
      { 'type': 'metric', 'name': 'Metric' } as ChartType,
      { 'type': 'line', 'name': 'Line' } as ChartType,
      { 'type': 'bar', 'name': 'Bar' } as ChartType,
      { 'type': 'radar', 'name': 'Radar' } as ChartType,
      { 'type': 'doughnut', 'name': 'Doughnut' } as ChartType,
      { 'type': 'polarArea', 'name': 'Polar Area' } as ChartType,
      { 'type': 'pie', 'name': 'Pie' } as ChartType
    ];
  }

  chartSizes(): Array<any> {
    return [
      { 'value': 1, 'name': '1' },
      { 'value': 2, 'name': '2' },
      { 'value': 3, 'name': '3' },
      { 'value': 4, 'name': '4' },
      { 'value': 5, 'name': '5' },
      { 'value': 6, 'name': '6' },
      { 'value': 7, 'name': '7' },
      { 'value': 8, 'name': '8' },
      { 'value': 9, 'name': '9' },
      { 'value': 10, 'name': '10' },
      { 'value': 11, 'name': '11' },
      { 'value': 12, 'name': '12' }];
  }

  public cloneObj(obj: any) {
    let copy: any;

    if (null == obj || 'object' != typeof obj) return obj;

    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++)
        copy[i] = this.cloneObj(obj[i]);

      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj)
        if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObj(obj[attr]);

      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

}
