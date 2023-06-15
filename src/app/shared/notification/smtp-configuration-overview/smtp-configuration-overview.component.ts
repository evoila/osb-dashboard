import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SMTPConfig } from '../notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'sb-smtp-configuration-overview',
  templateUrl: './smtp-configuration-overview.component.html',
  styleUrls: ['./smtp-configuration-overview.component.scss']
})
export class SmtpConfigurationOverviewComponent implements OnInit {

  public smtpConfigs: Observable<SMTPConfig[]>;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.smtpConfigs = this.notificationService.getAllSMTPConfigs();
  }
}
