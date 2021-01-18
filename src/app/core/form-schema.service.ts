import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/runtime-environment';

@Injectable()
export class FormSchemaService {
  MANAGE_BASE_URL: string;

  constructor(private http: HttpClient) {
    this.MANAGE_BASE_URL = environment.baseUrls.serviceBrokerUrl + '/custom/v2/manage/';
  }

  public loadFormSchema(schemaName: string): Observable<{} | any> {
    return this.http.get(this.MANAGE_BASE_URL + 'formSchema/' + environment.serviceInstanceId + '/' + schemaName);
  }

  public loadFormSchemaValues(): Observable<{} | any> {
    return this.http.get(this.MANAGE_BASE_URL + 'service_instances/' + environment.serviceInstanceId);
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
