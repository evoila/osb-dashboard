import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from '../../shared/services/endpoint.service';
import { ESQuery } from 'app/monitoring/table-editor/model/es-query';
import { map } from 'rxjs/internal/operators';

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
          const body = query!!.to_json();
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


      
      // building datastructure with only keys
      public buildKeyTree(data: Object, key_path: any[]=[]){
        var key_tree = {};
        var level_keys = this.getKeys(data, key_path);
        for (var i in level_keys){
          var key = level_keys[i];
          var extd_path = key_path.concat(key);
          var next_level_keys = this.getKeys(data, extd_path);
          key_tree[key] = next_level_keys.length > 0 ? this.buildKeyTree(data, extd_path) : '';
        }
        key_tree = key_tree == {} ? '' : key_tree;
        return key_tree;
      }


      // recursive way to get all keys at level specified by key_path
      public getKeys(data: Object, key_path: any[]){
        if (key_path.length > 0){
          var val = data[key_path[0]];
          return this.isLeave(val) ? [] : this.getKeys(val, key_path.slice(1));
        }
        return Object.keys(data);
      }

      private isLeave(value){
        return typeof value == 'string' || typeof value == 'number';
      }
    

}
