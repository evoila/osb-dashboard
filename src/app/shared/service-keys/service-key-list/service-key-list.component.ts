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
  serviceKeys: [any];
  isLoading = false;  
  constructor(protected readonly service: ServiceKeysService,
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

  create(): void {
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
  }

}
