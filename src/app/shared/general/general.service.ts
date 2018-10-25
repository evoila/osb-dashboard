import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { CoreHttpService } from '../../core/core-http.service';

import { environment } from 'environments/runtime-environment';
import { EntityService } from 'app/core';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class GeneralService extends EntityService {
  readonly BACKUP_BASEURL = '/custom/v2/manage/';

  constructor(protected readonly httpService: CoreHttpService) {
    super(httpService);
  }

  public loadAll(): Observable<{} | any> {
    return this.all(this.BACKUP_BASEURL + serviceInstanceId + '/');
  }

}
