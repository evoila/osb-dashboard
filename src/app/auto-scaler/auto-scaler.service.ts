import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class AutoScalerService {
  AUTOSCALER_BASEURL = endpoint;

  constructor(private http: HttpClient) {}

  public loadAll(entityRel: string): Observable<any> {
    const URL = this.AUTOSCALER_BASEURL + '/' + entityRel + '/serviceInstance/' + serviceInstanceId
    return this.http.get(URL);
  }

  public deleteOne(entityRel: string): Observable<any> {
    const URL = this.AUTOSCALER_BASEURL + '/' + entityRel;
    return this.http.delete(URL);
  }

  public loadOne(entityRel: string, id: string): Observable<any> {
    const URL = this.AUTOSCALER_BASEURL + '/' + entityRel;
    return this.http.get(URL);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<any> {
    const URL = this.AUTOSCALER_BASEURL + '/' + entityRel + '/' + id;
    return this.http.patch(URL, entity);
  }
}
