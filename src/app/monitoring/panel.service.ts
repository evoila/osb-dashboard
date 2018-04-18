import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EndpointService } from './endpoint.service';
import { Observable } from 'rxjs/Observable';
import { Panel } from './model/panel';

@Injectable()
export class PanelService {
  private endpoint = '/panel';

  constructor(private http: HttpClient,
    private endpointService: EndpointService
  ) { }

  public getAllPanels(serviceInstanceId: string): Observable<Array<Panel>> {
    let params = new HttpParams();
    params = params.append('serviceInstanceId', serviceInstanceId);

    const uri = this.endpointService.getUri() + this.endpoint;
    console.log(uri);
    return this.http.get<Array<Panel>>(uri, {params: params});
  }

  public getSpecificPanel(panelId: string): Observable<Panel> {
    const uri = this.endpointService.getUri() + this.endpoint + '/' + panelId;
    return this.http.get<Panel>(uri);
  }

  public addPanel(panel: Panel): Observable<Panel> {
    const uri = this.endpointService.getUri() + this.endpoint;
    return this.http.put<Panel>(uri, panel, this.endpointService.httpOptions);
  }

}
