import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/runtime-environment';


@Injectable()
export class EndpointService {
  //private baseUrl = 'https://osb-log-metric-dashboard-backend-test.cf.dev.eu-de-central.msh.host';
  private baseUrl = 'http://localhost';
  private authToken = environment.token;
  private port = ':8090';
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authToken
    })
  };
  public getUri(): string {
    return this.baseUrl + this.port
  }
  getSbHeader(): any {
    const headers: any = new Headers();
    headers.append('Authorization', this.authToken);
    return headers;
  }
}
