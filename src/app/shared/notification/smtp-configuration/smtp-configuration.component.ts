import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SMTPConfig } from '../notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'sb-smtp-configuration',
  templateUrl: './smtp-configuration.component.html',
  styleUrls: ['./smtp-configuration.component.scss']
})
export class SmtpConfigurationComponent implements OnInit {

  public smtpConfigs: Observable<SMTPConfig[]>;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.smtpConfigs = this.notificationService.getAllSMTPConfigs();
  }

}
