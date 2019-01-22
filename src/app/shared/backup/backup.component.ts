import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  menu: SidebarEntry[] = [{
      name: 'Overview',
      isCollapsible: false,
      links: [{
        name: 'Dashboard',
        href: '/backup',
        iconClass: 'fas fa-tachometer-alt'
      }]
    },
    {
      name: 'Configuration',
      isCollapsible: false,
      links: [{
        name: 'Endpoints',
        href: 'file-endpoints',
        iconClass: 'fas fa-server'
      },{
        name: 'Plans',
        href: 'backup-plans',
        iconClass: 'fas fa-file-alt'
      }]
    }, 
    {
      name: 'Backup',
      isCollapsible: false,
      links: [{
        name: 'Backup Jobs',
        href: 'backup-jobs',
        iconClass: 'fas fa-tasks'
      }]
    }, {
      name: 'Restore',
      isCollapsible: false,
      links: [{
        name: 'Restore Points',
        href: 'restore-points/finished',
        iconClass: 'fas fa-window-restore'
      }, {
        name: 'Restore Jobs',
        href: 'restore-jobs',
        iconClass: 'fas fa-tasks'
      }]
    }
  ];

  constructor() { }

  ngOnInit() {}
  
}
