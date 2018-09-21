import { Component, OnInit } from '@angular/core';
import { LBaasService } from './lbaas.service';
import { NotificationService, Notification, NotificationType } from '../core/notification.service';
@Component({
  selector: 'sb-lbaas',
  templateUrl: './lbaas.component.html',
  styleUrls: ['./lbaas.component.scss']
})
export class LBaasComponent implements OnInit {
  configuration = {}

  public publicIp: any;
  public responseString: string;
  public validDomains: boolean;
  public isLoading = false;

  constructor(readonly asService: LBaasService,
              protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.asService.getPublicIp('fip')
    .subscribe((publicIp: any) => {
      this.publicIp = publicIp['publicIp'];
    });
  }

  public validateDomains() : void {
    this.asService.validateOrSubmit(this.configuration, 'validate').subscribe(response => {
      if(response.message === "OK") {
        this.validDomains = true;
        this.nService.add(new Notification(NotificationType.Info, response.message));
      } else {
        this.validDomains = false;
        this.nService.add(new Notification(NotificationType.Error, 'False domains: ' + response.message));
      }
    });
  }

  public submitDomains() : void {
    if(this.validDomains) {
      this.isLoading = true;
      this.asService.validateOrSubmit(this.configuration, 'submit').subscribe({
        next: (d) => {
          this.isLoading = false;
          this.nService.add(new Notification(NotificationType.Info, 'Successfully updated Service'));
        },
        error: (e) => {
          this.nService.add(new Notification(NotificationType.Error, 'Error updating Service'));
        }
      });
    }
  }

  public onCertificateSubmit() : void {    
    this.asService.saveOne(this.configuration, 'certs').subscribe();
    this.nService.add(new Notification(NotificationType.Info, 'Successfully updated certificate'));
  }
}