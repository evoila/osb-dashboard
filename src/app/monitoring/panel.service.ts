import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EndpointService } from './endpoint.service';
import { Observable } from 'rxjs/Observable';
import { Panel } from './model/panel';
import { NotificationType, NotificationService, Notification } from 'app/core';
import { JsonPipe } from '@angular/common/';

@Injectable()
export class PanelService {
  private endpoint = '/panel';


  constructor(private http: HttpClient,
    private endpointService: EndpointService,
    private notification: NotificationService,
  ) {
  }

  public getAllPanels(serviceInstanceId: string): Observable<Array<Panel>> {
    let params = new HttpParams();
    params = params.append('serviceInstanceId', serviceInstanceId);

    const uri = this.endpointService.getUri() + this.endpoint;
    console.log(uri);
    return this.http.get<Array<Panel>>(uri, {params: params}).map(data =>  data).
    catch((error: any) => {
      console.log(error);
      this.notification.add(new Notification(NotificationType.Error, error.statusText));
      return Observable.throw(error.json);
    });
  }

  public getSpecificPanel(panelId: string): Observable<Panel> {
    const uri = this.endpointService.getUri() + this.endpoint + '/' + panelId;
    return this.http.get<Panel>(uri).map(data =>  data).
    catch((error: any) => {
      this.notification.add(new Notification(NotificationType.Error, error.json));
      return Observable.throw(error.json);
    });
  }

  public addPanel(panel: Panel): Observable<Panel> {
    const uri = this.endpointService.getUri() + this.endpoint;
    return this.http.put<Panel>(uri, panel, this.endpointService.httpOptions).map(data =>  data).
    catch((error: any) => {
      this.notification.add(new Notification(NotificationType.Error, error.json));
      return Observable.throw(error.json);
    });
  }

}
