import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';
import { BackupPlan } from './domain/backup-plan';
import { Job } from './domain/job';

@Injectable()
export class BackupService {

  constructor(protected readonly httpService: CoreHttpService) {}

  public loadBackupPlans(): Observable<{} | BackupPlan> {
    return this.httpService
      .get('/jobs/byInstance/')
      .map(res => {
        return res.json() as BackupPlan;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public loadRecentBackupJobs(): Observable<{} | Job> {
    return this.httpService
      .get('/plans/byInstance/')
      .map(res => {
        return res.json() as Job;
      })
      .catch(e => this.httpService.formatError(e));
  }

  public save(rel, entity: any): Observable<{} | any> {
    return this.httpService
      .post('/' + rel, entity)
      .map(res => res.json() as any)
      .catch(e => this.httpService.formatError(e));
  }

}
