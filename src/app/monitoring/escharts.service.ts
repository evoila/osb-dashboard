import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChartResponse } from './model/chart-response';
import { EsChartRequest } from './model/es-chart-request';
import { Chart } from './model/chart';
import { EndpointService } from './endpoint.service';
import { ChartRequest } from './model/chart-request';
import { PrometheusChartRequest } from './model/prom-chart-request';
import { NotificationType, NotificationService, Notification } from 'app/core';
import { JsonPipe } from '@angular/common/';
import { ErrorserviceService } from 'app/monitoring/errorservice.service';


@Injectable()
export class EschartsService {
  private baseUrl = 'http://localhost';
  private port = ':8080';
  private endpoint = '/api/charts/es/perform';
  private httpOptions = this.endpointService.httpOptions;

  constructor(
    private http: HttpClient,
    private endpointService: EndpointService,
    private notification: NotificationService,
    private errorService: ErrorserviceService
  ) {

  }
  public getCharts(chartRequest: EsChartRequest): Observable<Array<Chart>> {
    const uri: string = this.endpointService.getUri() + this.endpoint;
    return this.http.post<Array<Chart>>(uri, chartRequest, this.httpOptions).
    map(data =>  data).
    catch((error: any) => {
      this.notification.addSelfClosing(new Notification(NotificationType.Error, error.error.message));
      return Observable.throw(error.json);
    })
  }
  public getChart(chartRequest: EsChartRequest): Observable<Chart> {
    if (chartRequest.chartId) {
      const uri: string = this.endpointService.getUri() + this.endpoint + '/' + chartRequest.chartId;
      return this.http.post<Chart>(uri, chartRequest, this.httpOptions).map(data =>  data).
      catch((err) => this.errorService.handleErrors(err))
    } else {
      throw new Error('chartId is missing in Object');
    }
  }
  public getCatalogue(organisationId: string): Observable<Array<Chart>> {
    let params = new HttpParams();
    params = params.append('organisationId', organisationId);
    const endpoint = '/api/charts/catalogue';
    const uri: string = this.endpointService.getUri() + endpoint;

    const options = Object.assign({}, this.httpOptions, {params: params});
    return this.http.get<Array<Chart>>(uri, options).map(data =>  data).
    catch((err) => this.errorService.handleErrors(err))
  }
  public getChartFromCatalogue(chartId: string, organisationId: string): Observable<Chart> {
    let params = new HttpParams();
    params = params.append('organisationId', organisationId);
    const endpoint = '/api/charts/catalogue';
    const uri: string = this.endpointService.getUri() + endpoint + '/' + chartId;
    const options = Object.assign({}, this.httpOptions, {params: params});
    return this.http.get<Chart>(uri, options).map(data =>  data).
    catch((err) => this.errorService.handleErrors(err))
  }

}

