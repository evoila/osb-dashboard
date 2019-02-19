import { Component, OnInit } from '@angular/core';
import { LBaasService } from '../lbaas.service';
import { NotificationService, Notification, NotificationType } from '../../core/notification.service';
import { FormSchemaService, TaskPollingService } from 'app/core';
import { EnrichedJsonSchema } from 'app/core/domain/json-schema';

@Component({
  selector: 'sb-letsencrypt',
  templateUrl: './letsencrypt.component.html',
  styleUrls: ['./letsencrypt.component.scss']
})
export class LetsencryptComponent implements OnInit {
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
      this.jsonSchema.schema = this.formSchemaService.filterSchema(result, "ha_proxy", ["letsencrypt"]);      
    });
    this.formSchemaService.loadFormSchemaValues()
      .subscribe((result: any) => {
      this.jsonSchema.data = result.parameters[this.instanceGroupName];
    });
  }

  public save($event: any): void {
    let payload = {};
    payload[this.instanceGroupName] = this.jsonSchema.data;

    this.asService.validateOrSubmit(payload, 'validate').subscribe({
      next: (d) => {
        this.nService.addSelfClosing(new Notification(NotificationType.Info, d.message));
        this.asService.validateOrSubmit(payload, '').subscribe({
          next: (d) => {
            this.taskPolling.pollState("Updating Service", "state", "description");
            this.nService.addSelfClosing(new Notification(NotificationType.Info, 'Successfully updated Service'));
          },
          error: (e) => {
            this.nService.addSelfClosing(new Notification(NotificationType.Error, 'Error updating Service'));
          }
        });
      },
      error: (e) => {
        this.nService.addSelfClosing(new Notification(NotificationType.Error, 
          'The following domains could not be resolved: ' + e.message));
      }
    });
  }

}
