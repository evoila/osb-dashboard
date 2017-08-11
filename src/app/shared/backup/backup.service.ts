import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class BackupService {
  SORT_CONFIG = 'sort=startDate,desc';
  BACKUP_BASEURL = '/v2/manage/backup';

  constructor(protected readonly httpService: CoreHttpService) {}

  public loadEntities(entity): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + entity + '?' + this.SORT_CONFIG)
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadEntity(entity, id): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + entity + '/' + id)
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public validate(rel: string, entity: any): Observable<{} | any> {
    return this.httpService
      .post(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + rel + '/validate' , entity)
      .map(res => {
        return res.json() as any;
      })

  }

  public save(rel, entity: any): Observable<{} | any> {
    return this.httpService
      .post(this.BACKUP_BASEURL + '/'  + serviceInstanceId + '/'  + rel, entity)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

  public update(rel: string, entity: any): Observable<{} | any> {
    return this.httpService.patch(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + rel + '/' + entity.id, entity)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

  public delete(rel: string, entity: any): Observable<{} | any> {
    return this.httpService.delete(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/' + rel + '/' + entity.id)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

}
