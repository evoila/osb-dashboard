import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, Notification, NotificationType } from '../../../core/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackupPlan } from '../domain/backup-plan';

@Component({
  selector: 'sb-file-endpoint',
  templateUrl: './file-endpoint.component.html',
  styleUrls: ['./file-endpoint.component.scss']
})
export class FileEndpointComponent implements OnInit {
  readonly ENTITY: string = 'fileDestinations';
  destinationTypes = ['AWS S3', 'Custom S3', 'SWIFT'];
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

  @ViewChild('notdeletablecontent')
  not_deletable_modal: ElementRef;
  backupPlans: BackupPlan[];

  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly nService: NotificationService,
    protected readonly modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['fileEndpointId']);
      if (params['fileEndpointId'] && (params['fileEndpointId'] != 'new')) {
        this.update = true;        
        this.backupService.loadOne(this.ENTITY, params['fileEndpointId']) 
          .subscribe(
            (destination: any) => { 
              this.destination = destination;
              console.log(destination);
            },
          );    
        // need to load als plans as well
        // for the case the user wants to delete the fileendpoint this controller is about
        // we have to check if this fileendpoint is used by a plan. This works best if the list of plans is alredy in memory
        // other option would be to catch the 409 error thrown by server, but that is not as straight forward as this aproach
        this.backupService
          .loadAll("backupPlans", 0) // passing a zero as pagination value, which is not really tested in all cenarios
          .subscribe((backupPlans: any) => {
            this.backupPlans = backupPlans.content;
        });

      }
    });
  }

  delete(content): void {

    console.log("attempting to delete fileendpoint");
    
    if(this.endpointIsUsedByAnyPlan()){
      this.modalService.open(this.not_deletable_modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          console.log("user has been informed that endpoint deletion is not possible")
      })
    }
    else{
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.backupService.deleteOne(this.ENTITY, this.destination)
    .subscribe((plan: any) => {
      console.log("plan after successful deletion: ");
      console.log(plan);
      this.redirect();
    });
    
    
  }, (reason) => {
    // we do nothing here, because user does not want to delete entity
  });
    }

  }


  endpointIsUsedByAnyPlan(): boolean{
    let veto = false;
    this.backupPlans.forEach(plan => {
      const planDestID = plan['fileDestination']['id'];
      if (planDestID === (this.destination.id)){
        veto = true;
        return;
      }
      
    });
    return veto;
  }

  check_endpoint_protocol(destination): boolean {
    
    if (destination['endpoint']){
      if (destination['endpoint'].length == 0){
        // no endpoint set
        return false;
      }else if (destination['endpoint'].includes('http://') || destination['endpoint'].includes('https://')){
        // endpoint with at least one http or https set
        return true;
      }
       // endpoint without protocol set
      return false;
    }
    return false;
    }
    
  onSubmit(): void {

    
    if (!this.validated) {

      // assure optional region value is at least an empty string if unset
      if (!this.destination['region']){
          this.destination['region'] = "";
      }
      
      // valite endpoint contains https:// or http://
      if (!this.check_endpoint_protocol(this.destination)){
        this.nService.add(new Notification(NotificationType.Warning, 'Please set an endpoint beginning with http:// or https://'));
        return
      }
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
      this.destination.serviceInstance = this.backupService.getServiceInstance();
      this.backupService.saveOne(this.destination, this.ENTITY, id)
        .subscribe((destination: any) => {
          this.redirect();
        });
    }
  }

  private redirect(): void {
    this.router.navigate(['/backup/file-endpoints']);
  }

}
