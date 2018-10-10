import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/runtime-environment';
import { ExtensionUrl, Server } from '../core/extension-url';
import { ExtensionUrlService } from '../core/extension-url.service';
import { Observable } from 'rxjs/Observable';


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


  constructor(private urlService: ExtensionUrlService) { }
  public getUri(): string {
    return this.baseUrl;
  }
}

