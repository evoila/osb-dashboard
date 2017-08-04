import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';
import { BackupPlan } from './domain/backup-plan';
import { Job } from './domain/job';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class BackupService {
  BACKUP_BASEURL = '/v2/manage/backup';

  constructor(protected readonly httpService: CoreHttpService) {}

  public loadBackupPlans(): Observable<{} | BackupPlan> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/plans?sort=startDate,desc' )
      .map(res => {
        return res.json() as BackupPlan;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadBackupPlan(planId: string): Observable<{} | BackupPlan> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/plans/' + planId)
      .map(res => {
        return res.json() as BackupPlan;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadRecentBackupJobs(): Observable<{} | Job> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/jobs?sort=startDate,desc')
      .map(res => {
        return res.json() as Job;
      })
      .catch(e => this.httpService.formatError(e));
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

  public loadBackupJob(jobId: string) {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/jobs/' + jobId )
      .map(res => {
        return res.json();
      })
      .catch(e => this.httpService.formatError(e));
  }
}
