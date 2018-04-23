import { Injectable } from '@angular/core';
import { EndpointService } from 'app/monitoring/endpoint.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PrometheusChartRequest } from 'app/monitoring/model/prom-chart-request';
import { ChartRequest } from './model/chart-request';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PromchartsService {
  private endpoint = '/charts/prom/perform';
  constructor(
    private http: HttpClient,
    private endpointService: EndpointService
  ) { }
  public getCharts(prometheusQuerie: PrometheusChartRequest): Observable<Chart> {
    if (prometheusQuerie.chartId) {
      const uri: string = this.endpointService.getUri + this.endpoint + prometheusQuerie.chartId
      return this.http.post<Chart>(uri, prometheusQuerie);
    } else {
      throw new Error('chartId is missing in Object');
    }
  }
}