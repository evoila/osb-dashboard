import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { HttpClient } from '@angular/common/http';
import { SearchRequest } from './model/search-request';
import { Observable } from 'rxjs/Observable';
import { SearchResponse } from './model/search-response';
import { Response } from '@angular/http/src/static_response';
import { NotificationType, NotificationService, Notification } from 'app/core';



@Injectable()
export class SearchService {

  constructor(private endpoint: EndpointService,
    private http: HttpClient,
    private notification: NotificationService
  ) { }
  public getSearchResults(request: SearchRequest): Observable<SearchResponse> {
    const endpoint = this.endpoint.getUri() + '/search'
    return this.http.post(endpoint, request).map(
      (data: Response) => data
    )
      .catch((error: any) => {
        this.notification.add(new Notification(NotificationType.Error, error.json));
        return Observable.throw(error.json);
      })
  }
  public getMappings(): Observable<Array<string>> {
    const endpoint = this.endpoint.getUri() + '/mappings'
    return this.http.get(endpoint).map(
      (data) => Object.keys(data['mappings']['logMessages']['properties'])
    ).catch((error: any) => {
      this.notification.add(new Notification(NotificationType.Error, error.json));
      return Observable.throw(error.json);
    })
  }
}
