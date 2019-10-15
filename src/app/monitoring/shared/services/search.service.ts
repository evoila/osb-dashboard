import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { HttpClient } from '@angular/common/http';
import { SearchRequest } from '../../model/search-request';
import { SearchResponse } from '../../model/search-response';
import { Response } from '@angular/http/src/static_response';
import { NotificationType, NotificationService, Notification } from 'app/core';

import { catchError, map } from 'rxjs/operators';
import { Field } from 'app/monitoring/aggregation-editor/model/field';
import { AggregationRequestObject } from 'app/monitoring/chart-configurator/model/aggregationRequestObject';
import { Panel } from '../model/panel';
import { QueryAndResponse } from '../model/query-and-response';

@Injectable()
export class SearchService {
  private httpOptions = this.endpoint.httpOptions;
  constructor(
    private endpoint: EndpointService,
    private http: HttpClient,
    private notification: NotificationService
  ) { }
  public getSearchResults(
    request: SearchRequest
  ): Observable<SearchResponse | Response> {
    const endpoint = this.endpoint.getUri() + '/search';
    return this.http.post(endpoint, request, this.httpOptions).pipe(
      map((data: Response) => data),
      catchError((error: any) => {
        console.log("BIER");
        console.log(error);
        this.notification.addSelfClosing(
          new Notification(NotificationType.Error, error.message)
        );
        if (error && error.error && error.error.message) {
          console.log("TIER");
          return observableThrowError(error.error.message);
        }
      })
    );
  }

  public firePanelAggregation(
    request: Panel,
    range?: { [id: string]: any }
  ): Observable<{ [id: string]: Array<QueryAndResponse> }> {
    const endpoint = this.endpoint.getUri() + '/panel/aggregation';
    const requestObject = { first: request, second: range };
    return this.http.post<{ [id: string]: Array<QueryAndResponse> }>(endpoint, requestObject).pipe(
      catchError((error: any) => {
        console.log(error);
        this.notification.addSelfClosing(
          new Notification(NotificationType.Error, 'aggregation failed!')
        );
        return observableThrowError(error);
      })
    );
  }


  public fireAggregation(
    request: Array<AggregationRequestObject>
  ): Observable<Array<SearchResponse>> {
    const endpoint = this.endpoint.getUri() + '/aggregation';
    return this.http.post<Array<SearchResponse>>(endpoint, request).pipe(
      catchError((error: any) => {
        console.log(error);
        this.notification.addSelfClosing(
          new Notification(NotificationType.Error, 'aggregation failed!')
        );
        return observableThrowError(error);
      }));
  }

  public getMappings(): Observable<Map<string, Array<string> | Response>> {
    const endpoint = this.endpoint.getUri() + '/mappings';
    return this.http.get(endpoint, this.httpOptions).pipe(
      map((dataAsObject: any) => {
        const datas = new Map<string, any>(Object.entries(dataAsObject));
        const returnVal = new Map<string, Array<string>>();
        datas.forEach((data, index) => {
          Object.keys(data['mappings']['_doc']['properties']).forEach(item => {
            const property = data['mappings']['_doc']['properties'][item];
            returnVal[index] = returnVal[index]
              ? returnVal[index]
              : new Array<string>();
            // Some Fields have a Subfield. For more information see Ticket MONF-56
            if (!property['fields']) {
              returnVal[index] = [...returnVal[index], item];
            } else {
              returnVal[index] = [
                ...returnVal[index],
                item + '.' + Object.keys(property['fields'])[0]
              ];
            }
          });
        });
        return returnVal;
      }),
      catchError((error: any) => {
        console.log(error);
        this.notification.addSelfClosing(
          new Notification(NotificationType.Error, error.error.message)
        );
        return observableThrowError(error.json);
      })
    );
  }

  public getMappingWithType(): Observable<Map<string, Array<Field>>> {
    const endpoint = this.endpoint.getUri() + '/mappings';
    return this.http.get(endpoint, this.httpOptions).pipe(
      map((dataAsObject: Map<string, any>) => {
        const returnVal = new Map<string, Array<Field>>();
        const datas = new Map<string, any>(Object.entries(dataAsObject));
        datas.forEach((data, key) => {
          Object.keys(data['mappings']['_doc']['properties']).forEach(item => {
            const property = data['mappings']['_doc']['properties'][item];
            returnVal[key] = returnVal[key]
              ? returnVal[key]
              : new Array<string>();
            if (!property['fields']) {
              returnVal[key] = [
                ...returnVal[key],
                { key: item, value: { type: property['type'] } } as Field
              ];
            } else {
              returnVal[key] = [
                ...returnVal[key],
                {
                  key: item + '.' + Object.keys(property['fields'])[0],
                  value: { type: Object.keys(property['fields'])[0] }
                } as Field
              ];
            }
          });
        });
        return returnVal;
      }),
      catchError((error: any) => {
        console.log(error);
        this.notification.addSelfClosing(
          new Notification(NotificationType.Error, error.error.message)
        );
        return observableThrowError(error.json);
      })
    );
  }
}
