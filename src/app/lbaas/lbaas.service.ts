import { Injectable } from '@angular/core';
import { EntityService, CoreHttpService } from 'app/core';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;

@Injectable()
export class LBaasService extends EntityService  {
  readonly CERTIFICATE_BASEURL = '/v2/manage/service_instances';
  
  constructor(protected readonly entityService: EntityService,
    protected readonly httpService: CoreHttpService) {
    super(httpService);
  }

  public saveOne(entity: any, entityRel: string, certified: boolean): Observable<{} | any> {    
    if (certified) {
      return this.patch(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
    } else {
      return this.post(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
    }
  }

  public isCertified(entityRel : string): Observable<{} | any> {
    return this.get(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel);
  }

  public getPublicIp(entityRel : string): Observable<{} | any> {
    return this.get(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel);
  }

  public validateOrSubmit(entity: any, entityRel: string): Observable<{} | any> {
    return this.post(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
  }
}

