import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { CoreHttpService } from '../../core/core-http.service';

import { environment } from 'environments/runtime-environment';
import { EntityService } from 'app/core';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class GeneralService extends EntityService {
  GENERAL_BASEURL: string;

  constructor(protected readonly httpService: CoreHttpService) {
    super(httpService);
    this.GENERAL_BASEURL = endpoint + '/custom/v2/manage/';
  }

  public getServiceInstanceId(): string {
    return serviceInstanceId;
  }

  public loadAll(): Observable<{} | any> {
    return this.all(this.GENERAL_BASEURL + 'service_instances/' + serviceInstanceId);
  }

  public customLoadAll(path: String): Observable<{} | any> {
    return this.all(this.GENERAL_BASEURL + path);
  }

}
