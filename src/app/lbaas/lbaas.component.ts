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

  public certified: boolean;
  public publicIp: any;
  public responseString: string;
  public validDomains: boolean

  constructor(readonly asService: LBaasService,
              protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.asService.getPublicIp('fip')
    .subscribe((publicIp: any) => {
      this.publicIp = publicIp['publicIp'];
    });
    
    const warning = document.getElementById('certificateWarning');

    if(warning != null) {
      warning.style.display = "none";

      this.asService.isCertified('certs').subscribe(status => {
        this.certified = status;

        if(this.certified) {
          warning.style.display = "block";
        }
      });
    }
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
      this.asService.validateOrSubmit(this.configuration, 'submit').subscribe();
    }
  }

  public onCertificateSubmit() : void {    
    if(this.certified) {
      this.asService.saveOne(this.configuration, 'certs', true).subscribe();
      this.nService.add(new Notification(NotificationType.Info, 'Successfully updated certificate'));
    } else {
      this.asService.saveOne(this.configuration, 'certs', false).subscribe();
      this.nService.add(new Notification(NotificationType.Info, 'Successfully stored certificate'));
    } 
  }
}
