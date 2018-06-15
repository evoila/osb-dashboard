import { Injectable } from '@angular/core';
import { environment } from '../../environments/runtime-environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotificationService, Notification, NotificationType } from 'app/core';
import { EndpointService } from './endpoint.service';
import { ServiceBinding } from 'app/monitoring/model/service-binding';

@Injectable()
export class BindingService {
  private instanceId = environment.serviceInstanceId;
  private endpoint = `v2/service_instances/${this.instanceId}/service_bindings`;
  constructor(private http: HttpClient,
    private notification: NotificationService,
    private enpointService: EndpointService) { }

  getBindings(): Observable<Array<ServiceBinding>> {
    let uri = environment.baseUrls.serviceBrokerUrl;
    uri += this.endpoint;
    const httpOptions = {
      headers: this.enpointService.getSbHeader()
    };

    return this.http.get(uri, httpOptions).
    map( data => data['service_bindings'] as Array<ServiceBinding>).
    catch(error => {
      console.log(error);
      this.notification.add(new Notification(NotificationType.Error, error.statusText));
      return Observable.throw(error.json);
    });
  }
}
