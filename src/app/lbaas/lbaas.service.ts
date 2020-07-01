import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class LBaasService {
  readonly CERTIFICATE_BASEURL = endpoint + '/custom/v2/manage/service_instances';
  constructor(private readonly http: HttpClient) {
  }

  public saveOne(entity: any, entityRel: string): Observable<any> {
    return this.http.patch(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
  }

  public isCertified(entityRel : string): Observable<any> {
    return this.http.get(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel);
  }

  public getPublicIp(entityRel : string): Observable<any> {
    return this.http.get(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel);
  }

  public validateOrSubmit(entity: any, entityRel: string): Observable<any> {
    return this.http.post(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
  }
}