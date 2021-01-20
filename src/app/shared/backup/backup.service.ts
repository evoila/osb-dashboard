import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomEndpointService } from 'app/core/custom-endpoint.service';
import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackupService {
  BACKUP_BASEURL: string;

  constructor(private readonly http: HttpClient,
    customEndpointService: CustomEndpointService) {
    this.BACKUP_BASEURL = customEndpointService.getUri('osb-backup-manager') as string;
  }

  public getServiceInstance(): string {
    return environment.serviceInstance;
  }


  protected pagingAndSortingHandler(pagingAndSorting: any): string {
    var resultString: string = '';

    if (pagingAndSorting == null || pagingAndSorting.length == 0) {
      return resultString;
    }

    resultString += '?size=' + pagingAndSorting.pageSize;
    resultString += '&page=' + (pagingAndSorting.page - 1);

    return resultString;
  }
  protected filterHandler(filterQuery: any): string {
    var resultString: string = '';

    if (filterQuery == null)
      return resultString;

    Object.keys(filterQuery).forEach(key => {
      resultString += '&' + key + '=' + filterQuery[key];
    });

    return resultString;
  }

  public loadAll(entityRel: string, pagingAndSorting?: any): Observable<any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel + '/byInstance/'
      + environment.serviceInstanceId + this.pagingAndSortingHandler(pagingAndSorting));
  }

  public loadAllFiltered(entityRel: string, filterQuery?: any, pagingAndSorting?: any): Observable<any> {
    return this.http.get(this.BACKUP_BASEURL + '/' + entityRel + '/byInstance/'
      + environment.serviceInstanceId + '/filtered' + this.pagingAndSortingHandler(pagingAndSorting) + this.filterHandler(filterQuery));
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
