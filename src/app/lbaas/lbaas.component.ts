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

  public onSubmit() : void {    
    if(this.certified) {
      this.asService.saveOne(this.configuration, 'certs', true).subscribe();
      this.nService.add(new Notification(NotificationType.Info, 'Successfully updated certificate'));
    } else {
      this.asService.saveOne(this.configuration, 'certs', false).subscribe();
      this.nService.add(new Notification(NotificationType.Info, 'Successfully stored certificate'));
    } 
  }
}
