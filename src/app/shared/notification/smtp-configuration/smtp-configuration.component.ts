import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'sb-smtp-configuration',
  templateUrl: './smtp-configuration.component.html',
  styleUrls: ['./smtp-configuration.component.scss']
})
export class SmtpConfigurationComponent implements OnInit {

  public smtpConfigs: Observable<any>;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.smtpConfigs = this.notificationService.getAllSMTPConfigs();
  }

}
