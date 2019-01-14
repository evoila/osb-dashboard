import { Injectable } from '@angular/core';
import { NotificationService } from 'app/core';
import { ErrorserviceService } from 'app/monitoring/shared/services/errorservice.service';
import { EndpointService } from 'app/monitoring/shared/services/endpoint.service';
import { OptionsRequestObject } from '../model/options-request-object';
import { Observable } from 'rxjs/internal/Observable';
import { ChartOptionsEntity } from '../model/chart-options-entity';
import { HttpGetParamsService } from '../../../core/services/http-get-params.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private readonly url: string;
  private readonly httpOptions = this.endpointService.httpOptions;
  private readonly endpoint = '/charting/options';

  constructor(
    private http: HttpClient,
    private endpointService: EndpointService,
    private notification: NotificationService,
    private errorService: ErrorserviceService,
    private privateHttpGetParams: HttpGetParamsService
  ) {
    this.url = this.endpointService.getUri() + this.endpoint;
  }
  public getOptions(
    request: OptionsRequestObject
  ): Observable<Array<ChartOptionsEntity>> {
    const params = this.privateHttpGetParams.convertParams(request);
    const httpOptions = Object.assign({ params: params }, this.httpOptions);

    return this.http
      .get<Array<ChartOptionsEntity>>(this.url, httpOptions)
      .pipe(catchError(err => this.errorService.handleErrors(err)));
  }
  public putOptions(
    request: ChartOptionsEntity
  ): Observable<ChartOptionsEntity> {
    return this.http
      .put<ChartOptionsEntity>(this.url, request, this.httpOptions)
      .pipe(catchError(err => this.errorService.handleErrors(err)));
  }
  public deleteOptions(optionsId: number) {
    const url = this.url + optionsId;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(err => this.errorService.handleErrors(err)));
  }
}
