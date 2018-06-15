import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/runtime-environment';

@Injectable()
export class EndpointService {
  private baseUrl = 'http://osb-log-metric-dashboard-backend-test.cf.dev.eu-de-central.msh.host';
  private authToken = environment.token;
  private port = ':80';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    })
  }
  public getUri(): string {
    return this.baseUrl + this.port
  }
  getSbHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/hal+json;charset=UTF-8');
    return headers;
  }
}
