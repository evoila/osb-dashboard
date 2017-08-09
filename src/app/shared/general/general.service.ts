import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CoreHttpService } from '../../core/core-http.service';

import { environment } from 'environments/runtime-environment';

const serviceInstanceId = environment.serviceInstanceId;
@Injectable()
export class GeneralService {
  BACKUP_BASEURL = '/v2/manage/';

  constructor(protected readonly httpService: CoreHttpService) {}

  public loadGeneral(): Observable<{} | any> {
    return this.httpService
      .get(this.BACKUP_BASEURL + '/' + serviceInstanceId + '/')
      .map(res => {
        return res.json() as any;
      })
      .catch(e => this.httpService.formatError(e));
  }


}
