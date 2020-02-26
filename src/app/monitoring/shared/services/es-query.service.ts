import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/runtime-environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService, Notification, NotificationType } from 'app/core';
import { EndpointService } from './endpoint.service';
import { ESQuery } from 'app/monitoring/table-editor/model/es-query';
import { RawQuery } from 'app/monitoring/table-editor/model/raw-query';
import { catchError, map } from 'rxjs/internal/operators';


/**********************************************/ 
const queries_point = 'esqueries'  // ???? 
/**********************************************/


@Injectable({ providedIn: 'root' })
export class ESQueryService {
    private instanceId = environment.serviceInstanceId;
    private endpoint = `/serviceinstance/${this.instanceId}/`+ queries_point;
      constructor(
        private http: HttpClient,
        private notification: NotificationService,
        private endpointService: EndpointService
      ) {}

      getESQueries(): Observable<Array<ESQuery> | null> {

        if (environment.baseUrls.serviceBrokerUrl !== '') {
          let uri = this.endpointService.getUri() + this.endpoint;
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
}
