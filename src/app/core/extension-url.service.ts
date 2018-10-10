import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ExtensionUrl } from './extension-url';
import { environment } from 'environments/runtime-environment';
import { Observable } from 'rxjs/Observable';
import { Notification, NotificationService } from 'app/core';
import { NotificationType } from './notification.service';

@Injectable()
export class ExtensionUrlService {
  private endpoint = '/custom/v2/extensions';
  private extensionUrl: ExtensionUrl | null;
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.token
    })
  };

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) { }

  public getExtension(): Observable<ExtensionUrl> {
    if (this.extensionUrl) {
      return Observable.of(this.extensionUrl);
    }

    const uri = environment.baseUrls.serviceBrokerUrl + this.endpoint;
    return this.http.get<ExtensionUrl>(uri, this.httpOptions).map(data => {
      this.extensionUrl = data;
      return data
    }).
      catch((error: any) => {
        this.notification.addSelfClosing(new Notification(NotificationType.Error, error.error.message));
        return Observable.throw(error.json);
      });
  }

}
