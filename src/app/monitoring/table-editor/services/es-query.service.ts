import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/runtime-environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EndpointService } from '../../shared/services/endpoint.service';
import { ESQuery } from 'app/monitoring/table-editor/model/es-query';
import { map } from 'rxjs/internal/operators';
import { ServiceBinding } from 'app/monitoring/model/service-binding';
import { ESQuery_Request } from '../model/es-query-request';
import { CfAuthScope } from 'app/monitoring/chart-configurator/model/cfAuthScope';
import { RawQuery } from '../model/raw-query';

// GET /v1/queries/        --> getESQueries()
// GET /v1/queries/{ID}    --> getESQuery()
// POST /v1/queries/run    --> run() in shared/services/search.service.ts
// POST /v1/queries/       --> createESQuery() 
// PUT /v1/queries/{ID}    --> updateESQuery()
// DELETE /v1/queries/{ID} --> deletESQuery()



@Injectable({ providedIn: 'root' })
export class ESQueryService {

    private uri = this.endpointService.getUri() + "/queries"

      constructor(
        private http: HttpClient,
        private endpointService: EndpointService
      ) {}

      public getESQueries(): Observable<Array<ESQuery> | null> {

         const url = this.uri;
         return this.http.get(url, this.endpointService.httpOptions).pipe(
              map(data => data as Array<ESQuery>));
      }

      public getESQuery(query_id): Observable<ESQuery | null> {

        const url = this.uri + "/" + query_id;
        return this.http.get(url, this.endpointService.httpOptions).pipe(
             map(data => data as ESQuery));
     }
      
      
      public createESQuery(query: ESQuery): Observable<ESQuery | null>{
          const url = this.uri;
          const body = query.raw_query!!.to_json();
          return this.http.post<ESQuery>(url, body);
      }

    
      public updateESQuery(query_id): Observable<ESQuery | null>{
          const url = this.uri + "/" + query_id;
          return this.http.put(url, this.endpointService.httpOptions).pipe(
            map(data => data as ESQuery));
      }


      public deleteESQuery(query_id): Observable<ESQuery | null>{
        const url = this.uri + "/" + query_id;
        return this.http.delete(url, this.endpointService.httpOptions).pipe(
          map(data => data as ESQuery));
      }


      public run(query: ESQuery, scope: ServiceBinding): Observable<boolean>{
        console.log("...");
        const url = this.uri + "/run";
        const authScope = this.authScopeFromBinding(scope);
        const boolQueryRequest = new ESQuery_Request(scope.appId, 5, authScope, query.raw_query);
        const body = boolQueryRequest.jsonify();
        console.log(body);
        return this.http.post<boolean>(url, body); 
      }

      authScopeFromBinding(binding: ServiceBinding, type: string = "cf"): CfAuthScope {
        //binding.organization_guid
        return {
          type,
          orgId: binding.organization_guid,
          spaceId: binding.space,
          serviceInstanceId: environment.serviceInstanceId
        } as CfAuthScope
      }
}
