import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';
import { CoreHttpService } from '../core/core-http.service';
import { EntityService } from '../core/entity.service';
import { CustomEndpointService } from 'app/core/custom-endpoint.service';

const serviceInstanceId = environment.serviceInstanceId;

@Injectable()
export class AutoScalerService extends EntityService {
  BACKUP_BASEURL: string;

  constructor(protected readonly httpService: CoreHttpService, 
    protected readonly customEndpointService: CustomEndpointService) {      
      super(httpService);
      this.BACKUP_BASEURL = customEndpointService.getUri('osb-autoscaler-core');
  }

  public loadAll(entityRel: string): Observable<{} | any> {
    return this.all(this.BACKUP_BASEURL + '/' + entityRel + '/serviceInstance/' + serviceInstanceId + '/bindings');
  }

  public deleteOne(entityRel: string): Observable<{} | any> {
    return this.delete(this.BACKUP_BASEURL + '/' + entityRel);
  }

  public loadOne(entityRel: string, id: string): Observable<{} | any> {
    return this.get(this.BACKUP_BASEURL + '/' + entityRel + '/' + id);
  }

  public saveOne(entity: any, entityRel: string, id?: string): Observable<{} | any> {
    return this.patch(this.BACKUP_BASEURL + '/' + entityRel + '/' + id, entity);
  }

}
