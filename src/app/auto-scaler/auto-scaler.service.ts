import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'environments/runtime-environment';
import { CoreHttpService } from '../core/core-http.service';
import { EntityService } from '../core/entity.service';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class AutoScalerService extends EntityService {
  readonly AUTOSCALER_BASEURL = '';

  constructor(protected readonly entityService: EntityService,
    protected readonly httpService: CoreHttpService) {
    super(httpService);
    this.setCustomHeader('secret', 'jbkneo38858fjvone92');
    this.setCustomHeader('content-type', 'application/json;charset=UTF-8');
    this.setCustomHeader('accept', 'application/json;charset=UTF-8');
  }

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
