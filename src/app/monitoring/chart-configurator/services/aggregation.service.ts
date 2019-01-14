import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from '../../shared/services/endpoint.service';
import { CfAuthParameterService } from './cfauth-param.service';
import { Aggregation } from '../model/aggregation';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class AggregationService {
  private readonly url: string;
  private readonly endpoint = '/charting/aggregations';

  constructor(
    private http: HttpClient,
    private endpointService: EndpointService,
    private cfAuthParams: CfAuthParameterService
  ) {
    this.url = this.endpointService.getUri() + this.endpoint;
  }

  public getAllAggregations(chartType: string): Observable<Array<Aggregation>> {
    return this.cfAuthParams.createCfAuthParameters().pipe(
      flatMap(param => {
        const params = param.append('chartType', chartType);
        return this.http.get<Array<Aggregation>>(this.url, { params });
      })
    );
  }

  public createAggregation(aggregation: Aggregation): Observable<Aggregation> {
    return this.http.put<Aggregation>(this.url, aggregation);
  }

  public updateAggregation(aggregation: Aggregation): Observable<Aggregation> {
    const url = `${this.url}/${aggregation.id}`;
    return this.http.post<Aggregation>(url, aggregation);
  }
  public deleteAggregation(aggregationId: string): Observable<Aggregation> {
    const url = `${this.url}/${aggregationId}`;
    return this.http.delete<Aggregation>(url);
  }
}
