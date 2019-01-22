import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreHttpService } from 'app/core/core-http.service';
import { EntityService } from 'app/core/entity.service';

import { environment } from 'environments/runtime-environment';

@Injectable()
export class GeneralService extends EntityService {
  MANAGE_BASE_URL: string;

  constructor(protected readonly httpService: CoreHttpService) {     
    super(httpService);
    this.MANAGE_BASE_URL = environment.baseUrls.serviceBrokerUrl + '/custom/v2/manage/';
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

    return this.patch(url, entity);
  }
  
  public loadServiceInstance(): Observable<{} | any> {
    return this.get(this.MANAGE_BASE_URL + 'service_instances/' + environment.serviceInstanceId);
  }

  public customLoadAll(path: string, pagingAndSorting?: any): Observable<{} | any> {
    return this.all(this.MANAGE_BASE_URL + path + this.pagingAndSortingHandler(pagingAndSorting));
  }

  public customSave(path: string, entity: any): Observable<{} | any> {
    return this.post(this.MANAGE_BASE_URL + path, entity);
  }

}
