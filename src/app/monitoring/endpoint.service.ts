import { Injectable, DebugElement } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/runtime-environment';
import { ExtensionUrl, Server } from '../core/extension-url';
import { Observable } from 'rxjs/Observable';
import { Environment } from '../../environments/runtime-environment';
import { CatalogueService } from './catalogue.service';


@Injectable()
export class EndpointService {
  private baseUrl = 'https://osb-log-metric-dashboard-backend-test.cf.dev.eu-de-central.msh.host';
  // private baseUrl = 'http://localhost';
  private authToken = environment.token;
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authToken
    })
  };


  constructor() { }
  public getUri(): string {
    const matchingEnvs: Array<Server> = environment.customEndpoints.filter((k: Server) => k.description === 'DashboardBackendURL');
    if (matchingEnvs.length > 0) {
      return matchingEnvs[0].url;
    } else {
      return this.baseUrl;
    }
  }
}

