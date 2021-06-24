import { Component, OnInit, Input } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';

import { EnrichedJsonSchema } from 'app/core/domain/json-schema';
import { NotificationService, Notification, NotificationType } from 'app/core/notification.service';
import { TaskPollingService } from 'app/core/task-polling.service';
import { FormSchemaService } from 'app/core/form-schema.service';
import { GeneralService } from 'app/shared/general/general.service';

@Component({
  selector: 'sb-json-form-schema',
  templateUrl: './json-form-schema.component.html',
  styleUrls: ['./json-form-schema.component.scss']
})
export class JsonFormSchemaComponent implements OnInit {
  @Input("instance-group-name") instanceGroupName: string;
  @Input("form-elements") formElements: Array<string>;
  @Input("form-layout") formLayout: Array<any>;
  public jsonSchema: EnrichedJsonSchema = {
    schema: { schema: {} },
    data: {}
  };

  constructor(readonly generalService: GeneralService,
    readonly notificationService: NotificationService,
    readonly formSchemaService: FormSchemaService,
    readonly taskPolling: TaskPollingService) { }

  ngOnInit() {

    
    this.formSchemaService.loadFormSchemaValues().subscribe(result => {
        console.log("loadFormSchemaValues() :: " );
        console.log(result);
    });

    this.formSchemaService.loadFormSchemaValues().pipe(
      map(data => data.parameters[this.instanceGroupName]),
      switchMap((params, i) => this.formSchemaService.loadFormSchema('update').pipe(map(formSchema => { return { formSchema, params } }))),
      map((k: { formSchema, params }) => {
        const formSchema = this.formSchemaService.filterSchema(k.formSchema, this.instanceGroupName, this.formElements);
        
        return { params: k.params, formSchema }
      }), map(k => { return { ...this.jsonSchema, data: k.params, schema: k.formSchema } })
    ).subscribe(result => {
        this.jsonSchema = result;
        if (this.formLayout)
          this.jsonSchema.layout = this.formLayout;
    });
  }

  public save($event: any): void {
    let payload = {};
    payload[this.instanceGroupName] = this.jsonSchema.data;

    this.generalService.saveOne(payload).subscribe({
      next: (d) => {
        this.taskPolling.pollState("Updating Service", "state", "description");
        this.notificationService.addSelfClosing(new Notification(NotificationType.Info, 'Starting Service Instance Update - Observe Status In Task List (Top Right Corner)'));
      },
      error: (e) => {
        this.notificationService.addSelfClosing(new Notification(NotificationType.Error, 'Error Updating Service Instance'));
      }
    });
  }
}
