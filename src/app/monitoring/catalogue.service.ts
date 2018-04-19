import { Injectable } from '@angular/core';
import { EschartsService } from './escharts.service';
import { Chart } from './model/chart';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CatalogueService {
  private dummieIdentity = 'test'; //TODO: substitute with Identity-Serbice later on 
  constructor(
    private chartService: EschartsService,
  ) { }
  public getCatalogue(): Observable<ChartCatalogue> {
    return new Observable(observer => this.chartService.getCatalogue(this.dummieIdentity).
    subscribe((data) => {
      const logCharts = data.filter(k => k.aggregations);
      const metricCharts = data.filter(k => k.prometheusQueries);
      observer.next({logCharts, metricCharts });
    }));
  }

}
export interface ChartCatalogue {
  logCharts?: Array<Chart>
  metricCharts?: Array<Chart>
}
