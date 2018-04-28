import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChartResponse } from './model/chart-response';
import { EsChartRequest } from './model/es-chart-request';
import { Chart } from './model/chart';
import { EndpointService } from './endpoint.service';
import { ChartRequest } from './model/chart-request';
import { PrometheusChartRequest } from './model/prom-chart-request';


@Injectable()
export class EschartsService {
  private baseUrl = 'http://localhost';
  private port = ':8080';
  private endpoint = '/api/charts/es/perform';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  constructor(
    private http: HttpClient,
    private endpointService: EndpointService
  ) { }
  public getCharts(chartRequest: EsChartRequest): Observable<Array<Chart>> {
    const uri: string = this.endpointService.getUri() + this.endpoint;
    return this.http.post<Array<Chart>>(uri, chartRequest, this.httpOptions);
  }
  public getChart(chartRequest: EsChartRequest): Observable<Chart> {
    if (chartRequest.chartId) {
      const uri: string = this.endpointService.getUri() + this.endpoint + '/' + chartRequest.chartId;
      return this.http.post<Chart>(uri, chartRequest);
    } else {
      throw new Error('chartId is missing in Object');
    }
  }
  public getCatalogue(oragnisationId: string): Observable<Array<Chart>> {
    let params = new HttpParams();
    params = params.append('organisationId', oragnisationId);
    const endpoint = '/api/charts/catalogue';
    const uri: string = this.endpointService.getUri() + endpoint;
    return this.http.get<Array<Chart>>(uri, {params: params})
  }

}

