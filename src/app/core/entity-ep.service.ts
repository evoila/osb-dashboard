import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { CoreHttpService } from './core-http.service';
//import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EntityEndPointService {
    
    constructor(
      private http: HttpClient
    ) {}
  
    protected setCustomHeader(key: string, value: string) {
        // No usage/call of this function found anywhere
        console.error('setCustomHeader(key, str) method got called, but is not implemented');
        console.log(key, value);
    } 


  protected get(url: string): Observable<{} | any> {
    return this.http.get(url);
  }

  protected delete(url: string): Observable<{} | any> {
    return this.http
      .delete(url);
  }

  protected all(url: string): Observable<{} | any> {
    return this.http.get(url);
  }

  protected post(url: string, entity: any): Observable<{} | any> {
    return this.http.post(url, entity);
  }

  protected patch(url: string, entity: any): Observable<{} | any> {
    return this.http.patch(url, entity);
  }

}
