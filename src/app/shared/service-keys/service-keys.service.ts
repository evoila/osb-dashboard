import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class ServiceKeysService {
  SORT_CONFIG = 'sort=startDate,desc';
  BACKUP_BASEURL = endpoint + '/custom/v2/manage';

  constructor(private readonly http: HttpClient) {}

  public loadAll(entityRel: string): Observable<{} | any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel + '/' + serviceInstanceId + '/');
  }

  public deleteOne(entityRel: string, entity: any): Observable<{} | any> {
    return this.http.delete(this.BACKUP_BASEURL + '/' + entityRel  + '/' + serviceInstanceId + '/' + entity.id);
  }

  public loadOne(entityRel: string, id: string): Observable<{} | any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel  + '/' + serviceInstanceId + '/' + id);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<{} | any> {
    return this.http.post(this.BACKUP_BASEURL + '/' + entityRel  + '/' + serviceInstanceId, entity ?? {});
  }

}
