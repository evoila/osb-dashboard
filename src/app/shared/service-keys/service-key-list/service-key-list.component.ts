import { Component, OnInit } from '@angular/core';
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
  

  constructor(protected readonly service: ServiceKeysService,
    protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.loadKeys();
  }

  loadKeys(): void {
    console.log();
    
    this.service.loadAll(this.ENTITY)
      .subscribe((keys_page: any) => {
        this.serviceKeys = keys_page.content;
      });
  }


  toggleServiceKeyCreationForm(): void{
    this.showServiceKeyCreationForm = !this.showServiceKeyCreationForm;
    this.serviceKeyCreationHint = "";
  }

 

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

}
