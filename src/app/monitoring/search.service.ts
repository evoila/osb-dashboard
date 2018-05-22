import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { HttpClient } from '@angular/common/http';
import { SearchRequest } from './model/search-request';
import { Observable } from 'rxjs/Observable';
import { SearchResponse } from './model/search-response';
import { Response } from '@angular/http/src/static_response';


@Injectable()
export class SearchService {

  constructor(private endpoint: EndpointService,
    private http: HttpClient
  ) { }
  public getSearchResults(request: SearchRequest): Observable<SearchResponse> {
    const endpoint = this.endpoint.getUri() + '/search'
    return this.http.post(endpoint, request).map(
      (data: Response) => data
    )
    .catch((error: any) => Observable.throw(error.json));

  }
}
