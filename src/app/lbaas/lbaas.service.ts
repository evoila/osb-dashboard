import { Injectable } from '@angular/core';
import { EntityService, CoreHttpService } from 'app/core';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;

@Injectable()
export class LBaasService extends EntityService  {
  readonly CERTIFICATE_BASEURL = '/manage/service_instances/';

  constructor(protected readonly entityService: EntityService,
    protected readonly httpService: CoreHttpService) {
    super(httpService);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<{} | any> {
    if (id) {
      return this.patch(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
    } else {
      return this.post(this.CERTIFICATE_BASEURL + '/' + serviceInstanceId + '/' + entityRel, entity);
    }
  }

}
