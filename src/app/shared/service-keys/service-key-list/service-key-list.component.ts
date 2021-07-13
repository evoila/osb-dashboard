import { Component, OnInit } from '@angular/core';
import { EnrichedJsonSchema } from 'app/core/domain/json-schema';
import { FormSchemaService } from 'app/core/form-schema.service';
import { map, switchMap } from 'rxjs/operators';
import { createKeywordTypeNode } from 'typescript';
import { NotificationService, Notification, NotificationType } from '../../../core/notification.service';
import { ServiceKeysService } from '../service-keys.service';

@Component({
  selector: 'sb-service-key-list',
  templateUrl: './service-key-list.component.html',
  styleUrls: ['./service-key-list.component.scss']
})
export class ServiceKeyListComponent implements OnInit {
  readonly ENTITY = 'servicekeys';
  // every service key has a name, params are depending service type
  newServiceKey = {'name': '', 'params': {}};
  serviceKeys: [any];
  isLoading = false;
  showServiceKeyCreationForm = false;
  serviceKeyCreationHint = "";

  readonly parameterType: string = "create";
  public jsonSchema: EnrichedJsonSchema = {
    schema: { schema: {} },
    data: {}
  };
  

  constructor(
    readonly formSchemaService: FormSchemaService,
    protected readonly service: ServiceKeysService,
    protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.loadKeys();
  }

  loadKeys(): void {
    
    
    this.service.loadAll(this.ENTITY)
      .subscribe((keys_page: any) => {
        this.serviceKeys = keys_page.content;
      });
  }


  toggleServiceKeyCreationForm(): void{
    this.showServiceKeyCreationForm = !this.showServiceKeyCreationForm;
    this.serviceKeyCreationHint = "";
    if(this.showServiceKeyCreationForm){
        //this.formSchemaService.loadFormSchemaValues().pipe(
        //map(data => data.parameters),
        
        this.formSchemaService.loadFormSchema("binding/create/parameters")
      .subscribe(result => {
        this.jsonSchema.schema = result;  
        //this.jsonSchema = result;
      });
  }
    }
    
/*
.pipe(
          map(k => { 
            console.log("--");
            console.log(k);
            
            return { ...this.jsonSchema, data: k.params, schema: k.formSchema } })) 

*/
 

  create(): void {
    this.serviceKeyCreationHint = "";
    if(this.newServiceKey.name == ''){
      this.serviceKeyCreationHint = "Give it a name";
    }
    



    /* KEY CREATION CODE
    this.isLoading = true;
    this.service.saveOne({}, this.ENTITY)
      .subscribe({
        next: (d) => {
          this.isLoading = false;          
          this.nService.add(new Notification(NotificationType.Warning, 'Created new Service Key.'));
          this.loadKeys();
        },
        error: (e) => {
          this.nService.add(new Notification(NotificationType.Warning, 'Could not generate new Service Key'));
        }
      });
      */

      

  }


  createKey(event): void {
    console.log("CREATE KEY: ");
    console.log(event);
    let x = event.schema
    console.log(x);
    this.isLoading = true;
    this.service.saveOne({'parameters': x}, this.ENTITY)
      .subscribe({
        next: (d) => {
          this.isLoading = false;          
          this.nService.add(new Notification(NotificationType.Warning, 'Created new Service Key.'));
          this.loadKeys();
        },
        error: (e) => {
          this.nService.add(new Notification(NotificationType.Warning, 'Could not generate new Service Key'));
        }
      });
  }

}
