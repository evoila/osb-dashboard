import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Overview',
    isCollapsible: false,
    links: [{
      name: 'Notification',
      href: '/notification',
      iconClass: 'fas fa-tachometer-alt'
    }]
  },
  {
    name: 'Configuration',
    isCollapsible: false,
    links: [{
      name: 'SMTP',
      href: '/notification/smtp',
      iconClass: 'fas fa-tachometer-alt'
    },
    {
      name: 'Backup-Plans',
      href: '/notification/backup-plans',
      iconClass: 'fas fa-tachometer-alt'
    }]
  }];


  constructor() { }

  ngOnInit(): void {
  }

}
