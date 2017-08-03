import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';
import { BackupPlan } from './domain/backup-plan';
import { Job } from './domain/job';

@Injectable()
export class BackupService {
  BACKUP_BASEURL = '/v2/backup';
  constructor(protected readonly httpService: CoreHttpService) {}

  public loadBackupPlans(instanceId: string): Observable<{} | BackupPlan> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + instanceId + '/plans?sort=startDate,desc' )
      .map(res => {
        return res.json() as BackupPlan;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadBackupPlan(instanceId: string, planId: string): Observable<{} | BackupPlan> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + instanceId + '/plans/' + planId)
      .map(res => {
        return res.json() as BackupPlan;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadRecentBackupJobs(instanceId: string): Observable<{} | Job> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + instanceId + '/jobs?sort=startDate,desc')
      .map(res => {
        return res.json() as Job;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public save(instanceId: string, rel, entity: any): Observable<{} | any> {
    return this.httpService
      .post(this.BACKUP_BASEURL + '/'  + instanceId + '/'  + rel, entity)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

  public update(instanceId: string, rel: string, entity: any): Observable<{} | any> {
    return this.httpService.patch(this.BACKUP_BASEURL + '/' + instanceId + '/' + rel + '/' + entity.id, entity)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

  public delete(instanceId: string, rel: string, entity: any): Observable<{} | any> {
    return this.httpService.delete(this.BACKUP_BASEURL + '/' + instanceId + '/' + rel + '/' + entity.id)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

  public loadBackupJob(instanceId: string, jobId: string) {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + instanceId + '/jobs/' + jobId )
      .map(res => {
        return res.json();
      })
      .catch(e => this.httpService.formatError(e));
  }
}
