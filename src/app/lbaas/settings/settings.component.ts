import { Component, OnInit } from '@angular/core';
import { LBaasService } from '../lbaas.service';
import { FormSchemaService } from 'app/core/form-schema.service';
import { NotificationService, Notification, NotificationType } from '../../core/notification.service';
import { TaskPollingService } from 'app/core';
import { EnrichedJsonSchema } from 'app/core/domain/json-schema';

@Component({
  selector: 'sb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
      this.jsonSchema.schema = this.formSchemaService.filterSchema(result, this.instanceGroupName, ["stats", "timeout", 
        "disable_http", "https_redirect_all", "https_redirect_domains"]);      
      this.formSchemaService.loadFormSchemaValues()
        .subscribe((result: any) => {
        this.jsonSchema.data = result.parameters[this.instanceGroupName];
      });
      console.log(this.jsonSchema)
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
