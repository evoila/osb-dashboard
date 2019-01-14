import { Component, OnInit } from '@angular/core';
import { LBaasService } from '../lbaas.service';
import { NotificationService, Notification, NotificationType } from '../../core/notification.service';
import { FormSchemaService, TaskPollingService } from 'app/core';
import { EnrichedJsonSchema } from 'app/core/domain/json-schema';

@Component({
  selector: 'sb-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  public publicIp: any;
  public jsonSchema: EnrichedJsonSchema = {
    schema: { schema: {}},
    data: {}
  };
  readonly instanceGroupName: string = "ha_proxy";

  constructor(readonly asService: LBaasService,
    readonly nService: NotificationService,
    readonly formSchemaService: FormSchemaService,
    readonly taskPolling: TaskPollingService) { }

  ngOnInit() {
    this.asService.getPublicIp('fip')
      .subscribe((publicIp: any) => {
        this.publicIp = publicIp['publicIp'];
    });    

    this.formSchemaService.loadFormSchema('update')
      .subscribe((result: any) => {
      this.jsonSchema.schema = this.formSchemaService.filterSchema(result, "ha_proxy", ["ssl_pem"]);
      this.jsonSchema.layout = [{
        "key": "ssl_pem",
        "type": "textarea",
        "placeholder": "Please enter your PEM file contents for your private key and your certificate here."
      }];  
      this.formSchemaService.loadFormSchemaValues()
        .subscribe((result: any) => {        
        this.jsonSchema.data = result.parameters[this.instanceGroupName];
      });    
    });
  }

  public save($event: any): void {
    let payload = {};
    payload[this.instanceGroupName] = this.jsonSchema.data;

    this.asService.validateOrSubmit(payload, '').subscribe({
      next: (d) => {
        this.taskPolling.pollState("Updating Service", "state", "description");
        this.nService.addSelfClosing(new Notification(NotificationType.Info, 'Starting Service Instance Update'));
      },
      error: (e) => {
        this.nService.addSelfClosing(new Notification(NotificationType.Error, 'Error Updating Service Instance'));
      }
    });
  }

}
