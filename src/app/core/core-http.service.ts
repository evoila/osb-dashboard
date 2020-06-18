
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// DEPRECATED HTTP SERVICE USED IN VERSION 7
import {
  Http, ConnectionBackend, RequestOptionsArgs,
  Headers, RequestOptions, Request, Response
} from '@angular/http';
// NEW HTTPCLIENT SERVICE TO USE FOR ANG 8
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { environment } from 'environments/runtime-environment';
import { HttpParamsOptions } from '@angular/common/http/src/params';

const authToken = environment.token;

@Injectable()
export class CoreHttpService extends Http {
  private customHeaders = new Headers();
  private accessToken: string | undefined;

  public static makeOptions(accessToken?: string): RequestOptions {
    const headers = new Headers();

    headers.append('Accept', 'application/hal+json;charset=UTF-8');
    headers.append('Content-Type', 'application/hal+json;charset=UTF-8');

    if (accessToken) {
      headers.append('Authorization', accessToken);
    }

    return new RequestOptions({
      headers: headers
    });
  }

/*
  constructor(private httpc: HttpClient) {}
*/
  
  constructor(
    backend: ConnectionBackend) {
    super(backend, CoreHttpService.makeOptions(authToken));
    this.accessToken = authToken;
  }

  public setCustomHeader(key: string, value: string) {
    this.customHeaders.append(key, value);
  }

  public request(req: Request, options?: RequestOptionsArgs): Observable<Response> {
    if (this.accessToken) {
      req.headers.set('Authorization', this.accessToken);
    } else {
      req.headers.delete('Authorization');
      
    }

    this.customHeaders.forEach((values: string[], name: string) => {
        req.headers.set(name, values);
    });
 
    req.headers.set('Content-Type', "application/json");

    
    return super.request(req);
  }


/* ATTEMPT TO TRANSFORM request method 
  public request(req: HttpRequest<any>, options?: HttpParamsOptions): Observable<HttpEvent<any>> {
    if (this.accessToken) {
      req.headers.set('Authorization', this.accessToken);
    } else {
      req.headers.delete('Authorization');
      
    }

    this.customHeaders.forEach((values: string[], name: string) => {
        req.headers.set(name, values);
    });
 
    req.headers.set('Content-Type', "application/json");

    const optionz = { body: req.body, headers: req.headers }
    return this.httpc.request(req);
  }
*/
  public formatError<T>(error: Response | any): Observable<T> {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const msg = body.message || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''}. ${msg}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return observableThrowError(errMsg);
  }
}
