
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Http, ConnectionBackend, RequestOptionsArgs,
  Headers, RequestOptions, Request, Response
} from '@angular/http';
import { environment } from 'environments/runtime-environment';

const authToken = environment.token;

@Injectable()
export class CoreHttpService extends Http {
  private customHeaders = new Headers();
  private accessToken: string | undefined;

  public static makeOptions(accessToken?: string): RequestOptions {
    const headers = new Headers();

    headers.append('Accept', 'application/json;charset=UTF-8');
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    if (accessToken) {
      headers.append('Authorization', accessToken);
    }

    return new RequestOptions({
      headers: headers
    });
  }

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

    return super.request(req, options);
  }

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
