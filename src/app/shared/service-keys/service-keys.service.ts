import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class ServiceKeysService {
  BACKUP_BASEURL = '/v2/manage/servicekeys';

  constructor(protected readonly httpService: CoreHttpService) {}
  public get(serviceKeyId: string ): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + serviceKeyId)
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public delete(serviceKeyId: string ): Observable<{} | any> {
    return this.httpService
      .delete(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + serviceKeyId)
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadAll(): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/')
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public create(): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/create')
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

}
