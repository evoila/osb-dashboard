import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/runtime-environment';
import { Server } from '../core/extension-url';

@Injectable()
export class EndpointService {
  private baseUrl = 'https://osb-log-metric-dashboard-backend.cf.dev.eu-de-central.msh.host';
  // private baseUrl = 'http://localhost';
  private authToken = environment.token;
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authToken
    })
  };

  constructor() { }
  public getUri(): string {
    const matchingEnvs: Array<Server> = environment.customEndpoints.filter((k: Server) => k.identifier === 'DashboardBackendURL');
    if (matchingEnvs.length > 0) {
      return matchingEnvs[0].url;
    } else {
      return this.baseUrl;
    }
  }
}

