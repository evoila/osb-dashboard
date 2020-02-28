import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/runtime-environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService, Notification, NotificationType } from 'app/core';
import { EndpointService } from '../../shared/services/endpoint.service';
import { ESQuery } from 'app/monitoring/table-editor/model/es-query';
import { catchError, map } from 'rxjs/internal/operators';
import { ServiceBinding } from 'app/monitoring/model/service-binding';


/******************************************************/ 
const get_queries_point = 'xxx';                    // ???? 
const test_query_point = 'xxx/queryID/scope_appID'; // ???? 
const esquery_point = 'xxx';
/******************************************************/


@Injectable({ providedIn: 'root' })
export class ESQueryService {
    private instanceId = environment.serviceInstanceId;
    private get_all_esqueries_endpoint = `/serviceinstance/${this.instanceId}/`+ get_queries_point;
    private test_query_with_scope_endpoint = `/serviceinstance/${this.instanceId}/`+ test_query_point;
    private create_esquery_endpoint = `/serviceinstance/${this.instanceId}/`+ esquery_point;

      constructor(
        private http: HttpClient,
        private notification: NotificationService,
        private endpointService: EndpointService
      ) {}

      getESQueries(): Observable<Array<ESQuery> | null> {

        if (environment.baseUrls.serviceBrokerUrl !== '') {
          let uri = this.endpointService.getUri() + this.get_all_esqueries_endpoint;
          return this.http.get(uri, this.endpointService.httpOptions).pipe(
            map(data => data as Array<ESQuery>),
            catchError(error => {
              console.log(error);
              this.notification.addSelfClosing(
                new Notification(NotificationType.Error, error.message)
              );
              return observableThrowError(error);
            })
          );
        }
        return new Observable(observer => observer.next(null));
      }

      
      public testESQueryWithScope(que: ESQuery, sco: ServiceBinding): Observable<boolean>{
        if (environment.baseUrls.serviceBrokerUrl !== '') {
          let uri = this.endpointService.getUri() + this.test_query_with_scope_endpoint + '/' + que.id + '/' + sco.appId;
            return this.http.get<boolean>(uri);
        }
        return new Observable(observer => observer.next(false));
      }

      
      public createESQuery(query: ESQuery): Observable<ESQuery | null>{
        if (environment.baseUrls.serviceBrokerUrl !== '') {
          let uri = this.endpointService.getUri() + this.create_esquery_endpoint;
          return this.http.put<ESQuery>(uri, query);
        }
        return new Observable(observer => observer.next(null));
      }




      /* EXAMPLE WITH BODY DATA 
      public getAllAggregations(chartType: string): Observable<Array<Aggregation>> {
    return this.authParamService.createCfAuthParameters().pipe(
      flatMap(param => {
        const params = param.append('chartType', chartType);
        return this.http.get<Array<Aggregation>>(this.url, { params });
      })
    );
  }
      
      
      */

}
