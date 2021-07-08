import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BackupService } from "../backup.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NotificationService,
  Notification,
  NotificationType,
} from "../../../core/notification.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackupPlan } from "../domain/backup-plan";

@Component({
  selector: "sb-file-endpoint",
  templateUrl: "./file-endpoint.component.html",
  styleUrls: ["./file-endpoint.component.scss"],
})
export class FileEndpointComponent implements OnInit {

  readonly ENTITY: string = 'fileDestinations';
  readonly AWS_S3_ENDPOINT_URL: string = "https://s3.amazonaws.com";
  destination_copy = {};

  destinationTypes = ['AWS S3', 'Custom S3', 'SWIFT'];
  
  userActionDescriptor = "";
  // https://docs.aws.amazon.com/de_de/general/latest/gr/rande.html#s3_region
  regions = [
    {
      key: "USA East (Ohio)",
      value: "us-east-2",
    },
    {
      key: "USA East (North-Virginia)",
      value: "us-east-1",
    },
    {
      key: "USA West (North-California)",
      value: "us-east-2",
    },
    {
      key: "USA West (Oregon)",
      value: "us-east-2",
    },
    {
      key: "Canada (Central)",
      value: "ca-central-1",
    },
    {
      key: "Asia-Pacific (Mumbai)",
      value: "ap-south-1",
    },
    {
      key: "Asia-Pacific (Seoul)",
      value: "ap-northeast-2",
    },
    {
      key: "Asia-Pacific (Osaka-Local)",
      value: "ap-northeast-3",
    },
    {
      key: "Asia-Pacific (Singapur)",
      value: "ap-southeast-1",
    },
    {
      key: "Asia-Pacific (Sydney)",
      value: "ap-southeast-2",
    },
    {
      key: "Asia-Pacific (Tokio)",
      value: "ap-northeast-1",
    },
    {
      key: "China (Peking)",
      value: "cn-north-1",
    },
    {
      key: "China (Ningxia)",
      value: "cn-northwest-1",
    },
    {
      key: "EU (Frankfurt)",
      value: "eu-central-1",
    },
    {
      key: "EU (Irland)",
      value: "eu-west-1",
    },
    {
      key: "EU (London)",
      value: "eu-west-2",
    },
    {
      key: "EU (Paris)",
      value: "eu-west-3",
    },
    {
      key: "South-America (São Paulo)",
      value: "sa-east-1",
    },
  ];
  destination: any = {
    type: 'AWS S3'
  };
  update = false;
  validated = false;
  submitLabel = "Validate";
  submitButtonLocked = false;

  @ViewChild("notdeletablecontent")
  not_deletable_modal: ElementRef;
  backupPlans: BackupPlan[];

  constructor(
    protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly nService: NotificationService,
    protected readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log("NG ON INIT");
    this.route.params.subscribe(params => {
      //console.log(params['fileEndpointId']);
      // check if we have update or create mode
      if (params['fileEndpointId'] && (params['fileEndpointId'] != 'new')) {
        this.update = true;
        this.userActionDescriptor = "Edit";

        this.backupService.loadOne(this.ENTITY, params['fileEndpointId']) 
          .subscribe(
            (destination: any) => { 
              this.destination = destination;
              if (this.destination.type == 'S3'){
                  // detect if this is an "AWS S3" or "Custom AWS" FileEdpoint from Users perspective
                  // difference is that "Custom AWS" has an 'endpoint' field
                  this.destination['type'] = this.destination['endpoint'] ? 'Custom S3' : 'AWS S3';
              }
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
      else{
        // create mode
        this.update = false;
        this.userActionDescriptor = "Create"; 
      }
    });
  }

  delete(content): void {
    console.log("attempting to delete fileendpoint");

    if (this.endpointIsUsedByAnyPlan()) {
      this.modalService
        .open(this.not_deletable_modal, { ariaLabelledBy: "modal-basic-title" })
        .result.then((result) => {
          console.log(
            "user has been informed that endpoint deletion is not possible"
          );
        });
    } else {
      this.modalService
        .open(content, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          (result) => {
            this.backupService
              .deleteOne(this.ENTITY, this.destination)
              .subscribe((plan: any) => {
                console.log("fileendpoint deletion response:");
                console.log(plan);
                this.redirect();
              });
          },
          (reason) => {
            // we do nothing here, because user does not want to delete entity
          }
        );
    }
  }

  endpointIsUsedByAnyPlan(): boolean {
    let veto = false;
    this.backupPlans.forEach((plan) => {
      const planDestID = plan["fileDestination"]["id"];
      if (planDestID === this.destination.id) {
        veto = true;
        return;
      }
    });
    return veto;
  }

  check_endpoint_protocol(destination): boolean {
    
    if (destination["type"] == "AWS S3"){
      // no check at all (endpoint field not used)
        return true;
    }
    // check for all other destination types
    if (destination['endpoint']){
        if (destination['endpoint'].length == 0){
            // type is not "AWS S3" AND endpoint value is ""
            return false;
        }
        // validate prefix
        return (destination["endpoint"].includes("http://") || destination["endpoint"].includes("https://"));      
    } 
    // type is not "AWS S3" AND no endpoint set at all
    return false;
  }
   

  onSubmit(): void {
    
    
    if (this.submitButtonLocked) {
      return;
    }

    // actively disbale validate/submit button as long as request has led to a response
    this.submitButtonLocked = true;
    this.submitLabel = "Validating..";


    if (!this.validated) {
      /* VALIDATE */


      /* copy object */
      // copied object is needed because we change some attributes (type value) of the destination object right before validation
      // without this copy the UI form would change due to two-way data binding
      this.destination_copy = Object.assign({}, this.destination);

      /* ad const endpoint string for aws-s3 type */
      if(this.destination_copy['type'] == 'AWS S3'){
        this.destination_copy['endpoint'] = this.AWS_S3_ENDPOINT_URL;
      }

      /* modify type to fit backend */
      if(this.destination_copy['type'] == 'Custom S3' || this.destination_copy['type'] == 'AWS S3'){
        // transform "Custom S3" to "S3" (right before validation)
        // backend doesn't know 'Custom S3'
        this.destination_copy['type'] = 'S3';
      }


      // assure optional region value is at least an empty string if unset
      if (!this.destination_copy["region"]) {
        this.destination_copy["region"] = "";
      }

      // valite endpoint contains https:// or http://
      if (!this.check_endpoint_protocol(this.destination_copy)) {
        this.nService.add(
          new Notification(
            NotificationType.Warning,
            "Please set an endpoint beginning with http:// or https://"
          )
        );
        this.submitButtonLocked = false;
        this.submitLabel = "Validate";
        return;
      }
      this.destination_copy['serviceInstance'] = this.backupService.getServiceInstance();
    
  
      this.backupService.validate(this.ENTITY, this.destination_copy)
      
        .subscribe({
          next: (d) => {
            this.submitButtonLocked = false;
            this.validated = true;
            this.submitLabel = "Submit";
          },
          error: (e) => {
            this.submitButtonLocked = false;
            this.validated = false;
            this.destination_copy = {};
            this.submitLabel = "Validate";
            this.nService.add(
              new Notification(NotificationType.Warning, e.error)
            );
          },
        });
    } else {
      /* SUBMIT */
      this.submitLabel = "Submitting";
      const id = this.update ? this.destination_copy['id'] : null;
      this.destination_copy['serviceInstance'] = this.backupService.getServiceInstance();
      this.backupService
        .saveOne(this.destination_copy, this.ENTITY, id)
        .subscribe((destination: any) => {
          this.submitLabel = "Success";
          this.redirect();
        });
    }
  }

  private redirect(): void {
    this.router.navigate(["/backup/file-endpoints"]);
  }
}
