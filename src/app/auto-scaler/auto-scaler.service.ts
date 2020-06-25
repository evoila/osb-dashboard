import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';
import { CoreHttpService } from '../core/core-http.service';
import { EntityService } from '../core/entity.service';
import { EntityEndPointService } from 'app/core/entity-ep.service';

const serviceInstanceId = environment.serviceInstanceId;
const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class AutoScalerService extends EntityEndPointService {
  AUTOSCALER_BASEURL = endpoint;
/*
  constructor(protected readonly entityService: EntityService,
    protected readonly httpService: CoreHttpService) {
    super(httpService);    
  }
*/

  
  /*constructor(protected readonly entityService: EntityService,
    protected readonly httpService: CoreHttpService) {
    super(httpService);    
  }


*/
  public loadAll(entityRel: string): Observable<{} | any> {
    return this.all(this.AUTOSCALER_BASEURL + '/' + entityRel + '/serviceInstance/' + serviceInstanceId);
  }

  public deleteOne(entityRel: string): Observable<{} | any> {
    return this.delete(this.AUTOSCALER_BASEURL + '/' + entityRel);
  }

  public loadOne(entityRel: string, id: string): Observable<{} | any> {
    return this.get(this.AUTOSCALER_BASEURL + '/' + entityRel + '/' + id);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<{} | any> {
    return this.patch(this.AUTOSCALER_BASEURL + '/' + entityRel + '/' + id, entity);
  }

}
