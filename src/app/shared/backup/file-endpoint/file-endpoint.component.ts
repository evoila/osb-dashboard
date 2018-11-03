import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, Notification, NotificationType } from '../../../core/notification.service';

@Component({
  selector: 'sb-file-endpoint',
  templateUrl: './file-endpoint.component.html',
  styleUrls: ['./file-endpoint.component.scss']
})
export class FileEndpointComponent implements OnInit {
  readonly ENTITY: string = 'destinations';
  destinationTypes = ['S3', 'SWIFT'];
  // https://docs.aws.amazon.com/de_de/general/latest/gr/rande.html#s3_region
  regions = [{
    key: 'USA East (Ohio)',
    value: 'us-east-2'
  },{
    key: 'USA East (North-Virginia)',
    value: 'us-east-1'
  },{
    key: 'USA West (North-California)',
    value: 'us-east-2'
  },{
    key: 'USA West (Oregon)',
    value: 'us-east-2'
  },{
    key: 'Canada (Central)',
    value: 'ca-central-1'
  },{
    key: 'Asia-Pacific (Mumbai)',
    value: 'ap-south-1'
  },{
    key: 'Asia-Pacific (Seoul)',
    value: 'ap-northeast-2'
  },{
    key: 'Asia-Pacific (Osaka-Local)',
    value: 'ap-northeast-3'
  },{
    key: 'Asia-Pacific (Singapur)',
    value: 'ap-southeast-1'
  },{
    key: 'Asia-Pacific (Sydney)',
    value: 'ap-southeast-2'
  },{
    key: 'Asia-Pacific (Tokio)',
    value: 'ap-northeast-1'
  },{
    key: 'China (Peking)',
    value: 'cn-north-1'
  },{
    key: 'China (Ningxia)',
    value: 'cn-northwest-1'
  },{
    key: 'EU (Frankfurt)',
    value: 'eu-central-1'
  },{
    key: 'EU (Irland)',
    value: 'eu-west-1'
  },{
    key: 'EU (London)',
    value: 'eu-west-2'
  },{
    key: 'EU (Paris)',
    value: 'eu-west-3'
  },{
    key: 'South-America (São Paulo)',
    value: 'sa-east-1'
  }];
  destination: any = {
    type: 'S3'
  };
  update = false;
  validated = false;
  submitLabel = 'Validate';

  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['fileEndpointId']);
      if (params['fileEndpointId'] && (params['fileEndpointId'] != 'new')) {
        this.update = true;        
        this.backupService.loadOne(this.ENTITY, params['fileEndpointId']) 
          .subscribe(
            (destination: any) => { this.destination = destination },
          );        
      }
    });
  }

  delete(): void {
    this.backupService.deleteOne(this.ENTITY, this.destination)
      .subscribe((destination: any) => {
        this.redirect();
      });
  }

  onSubmit(): void {
    if (!this.validated) {
      this.destination.serviceInstanceId = this.backupService.getServiceInstanceId();

      this.backupService.validate(this.ENTITY, this.destination)
        .subscribe({
          next: (d) => {
            this.validated = true;
            this.submitLabel = 'Submit';
          },
          error: (e) => {
            this.nService.add(new Notification(NotificationType.Warning, 'Could not verify your account credentials.'));
          }
        });
    } else {
      const id = this.update ? this.destination.id : null;
      this.backupService.saveOne(this.destination, this.ENTITY, id)
        .subscribe((plan: any) => {
          this.redirect();
        });
    }
  }

  private redirect(): void {
    this.router.navigate(['/backup']);
  }

}
