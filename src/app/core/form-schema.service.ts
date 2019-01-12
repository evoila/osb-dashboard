import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService } from './entity.service';
import { CoreHttpService } from './core-http.service';

import { environment } from 'environments/runtime-environment';

@Injectable()
export class FormSchemaService extends EntityService {
  MANAGE_BASE_URL: string;

  constructor(protected readonly httpService: CoreHttpService) {    
    super(httpService);
    this.MANAGE_BASE_URL = environment.baseUrls.serviceBrokerUrl + '/custom/v2/manage/';
  }

  public loadFormSchema(schemaName: string): Observable<{} | any> {
    return this.get(this.MANAGE_BASE_URL + 'formSchema/' + environment.serviceInstanceId + '/' + schemaName);
  }

  public loadFormSchemaValues(): Observable<{} | any> {
    return this.get(this.MANAGE_BASE_URL + 'service_instances/' + environment.serviceInstanceId);
  }

  public filterSchema(result: any, instanceGroup: string, elements: Array<string>) : any {
    let filteredInstanceGroup = result.schema.properties[instanceGroup];

    if (filteredInstanceGroup != null) {
      result.type = result.schema.type;
      result.properties = Object.keys(filteredInstanceGroup.properties)
        .filter(key => elements.includes(key))
        .reduce((obj, key) => {
          obj[key] = filteredInstanceGroup.properties[key];
          return obj;
        }, {});
      return result;
    }
    return null;
  }
}
