import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';

import { HttpClient } from '@angular/common/http';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class GeneralService {
  GENERAL_BASEURL: string;

  constructor(private readonly http: HttpClient) {
    this.GENERAL_BASEURL = endpoint + '/custom/v2/manage/';
  }

  public getServiceInstanceId(): string {
    return serviceInstanceId;
  }

  public loadAll(): Observable<any> {
    return this.http.get(this.GENERAL_BASEURL + 'service_instances/' + serviceInstanceId);
  }

  public customLoadAll(path: String): Observable<any> {
    return this.http.get(this.GENERAL_BASEURL + path);
  }

}
