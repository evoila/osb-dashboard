import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreHttpService } from '../../core/core-http.service';
import { EntityService } from 'app/core';

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

  public loadServiceInstance(): Observable<{} | any> {
    return this.get(this.MANAGE_BASE_URL + environment.serviceInstanceId);
  }

  public customLoadAll(path: string): Observable<{} | any> {
    return this.all(this.MANAGE_BASE_URL + path);
  }

  public customSave(path: string, entity: any): Observable<{} | any> {
    return this.post(this.MANAGE_BASE_URL + path, entity);
  }

}
