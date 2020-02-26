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
const get_queries_point = 'ZZZZZZZZ'                    // ???? 
const test_query_point = 'XXXXXXXX/queryID/scope_appID' // ???? 
/******************************************************/


@Injectable({ providedIn: 'root' })
export class ESQueryService {
    private instanceId = environment.serviceInstanceId;
    private get_all_esqueries_endpoint = `/serviceinstance/${this.instanceId}/`+ get_queries_point;
    private test_query_with_scope_endpoint = `/serviceinstance/${this.instanceId}/`+ test_query_point;

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
