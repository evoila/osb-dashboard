import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomEndpointService } from 'app/core/custom-endpoint.service';
import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class BackupService {
  SORT_CONFIG = 'sort=startDate,desc';
  BACKUP_BASEURL: string;

  constructor(private readonly http: HttpClient,
    customEndpointService: CustomEndpointService
    ) {
      this.BACKUP_BASEURL = customEndpointService.getUri('osb-backup-manager') || "default_uri";
  }

  public getServiceInstanceId(): string {
    return serviceInstanceId;
  }

  public loadAll(entityRel: string): Observable<any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel + '/byInstance/' + serviceInstanceId + '?' + this.SORT_CONFIG);
  }

  public deleteOne(entityRel: string, entity: any): Observable<any> {
    return this.http.delete(this.BACKUP_BASEURL + '/' + entityRel + '/' + entity.id);
  }

  public loadOne(entityRel: string, id: string): Observable<any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel + '/' + id);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<any> {
    if (id) {
      return this.http.patch(this.BACKUP_BASEURL + '/' + entityRel + '/' + id, entity);
    } else {
      return this.http.post(this.BACKUP_BASEURL + '/'  + entityRel, entity);
    }
  }

  public validate(rel: string, entity: any): Observable<any> {
    return this.http.post(this.BACKUP_BASEURL + '/' + rel + '/validate' , entity);
  }

}
