import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChartResponse } from './model/chart-response';
import { EsChartRequest } from './model/es-chart-request';
import { Chart } from './model/chart';

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
  ) { }
  public getChart(chartRequest: EsChartRequest): Observable<Array<Chart>> {
    const uri: string = this.baseUrl + this.port + this.endpoint;
    console.log(uri);
    return this.http.post<Array<Chart>>(uri, chartRequest, this.httpOptions);
  }
}

