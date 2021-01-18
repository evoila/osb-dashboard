import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeneralService {
  MANAGE_BASE_URL: string;

  constructor(private readonly http: HttpClient) {
    this.MANAGE_BASE_URL = environment.baseUrls.serviceBrokerUrl + '/custom/v2/manage/';
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

  public getServiceInstanceId(): string {
    return environment.serviceInstanceId;
  }

  public getServiceInstance(): string {
    return environment.serviceInstance;
  }

  public saveOne(entity: any, entityRel?: string): Observable<{} | any> {
    let url = this.MANAGE_BASE_URL + 'service_instances/' + environment.serviceInstanceId;
    if (entityRel)
      url += '/' + entityRel;

    return this.http.patch(url, entity);
  }

  public loadServiceInstance(): Observable<{} | any> {
    return this.http.get(this.MANAGE_BASE_URL + 'service_instances/' + environment.serviceInstanceId);
  }

  public customLoadAll(path: string, pagingAndSorting?: any): Observable<{} | any> {
    return this.http.get(this.MANAGE_BASE_URL + path + this.pagingAndSortingHandler(pagingAndSorting));
  }

  public customSave(path: string, entity: any): Observable<{} | any> {
    return this.http.post(this.MANAGE_BASE_URL + path, entity);
  }

}
