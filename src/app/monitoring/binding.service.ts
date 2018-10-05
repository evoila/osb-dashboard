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
  private endpoint = `/custom/v2/manage/${this.instanceId}/service_bindings`;
  constructor(private http: HttpClient,
    private notification: NotificationService,
    private endpointService: EndpointService) { }

  getBindings(): Observable<Array<ServiceBinding> | null> {
    if (environment.baseUrls.serviceBrokerUrl !== '/*[[${endpointUrl}]]*/')  {
      let uri = environment.baseUrls.serviceBrokerUrl;
      uri += this.endpoint;
      return this.http.get(uri, this.endpointService.httpOptions).
        map(data => data as Array<ServiceBinding>).
        catch(error => {
          console.log(error);
          this.notification.addSelfClosing(new Notification(NotificationType.Error, error.message));
          return Observable.throw(error);
        });
    }
    return new Observable((observer) => observer.next(null));
  }
}
