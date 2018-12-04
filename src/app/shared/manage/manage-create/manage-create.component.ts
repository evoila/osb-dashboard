import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/shared/general/general.service';
import { NotificationService, Notification } from 'app/core';
import { NotificationType } from 'app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-manage-create',
  templateUrl: './manage-create.component.html',
  styleUrls: ['./manage-create.component.scss']
})
export class ManageCreateComponent implements OnInit {
  manage : any = {};

  constructor(protected readonly router: Router,
        protected readonly generalService: GeneralService,
      protected readonly notificationService: NotificationService) { }

  ngOnInit() {}

  onSubmit(): void {
    this.generalService.customSave('backup/' + this.generalService.getServiceInstanceId() + '/items', this.manage)
      .subscribe({
        next: (d) => {
          this.notificationService
            .addSelfClosing(new Notification(NotificationType.Info, 'Item Created'));
          this.redirect();
        },
        error: (e) => {
          this.notificationService
            .addSelfClosing(new Notification(NotificationType.Warning, 'Could not create Item. Please check your entries.'));
        }
      });
  }

  private redirect(): void {
    this.router.navigate(['/manage']);
  }

}
