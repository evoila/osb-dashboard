import { Component, OnInit } from '@angular/core';
import { EsChartRequest } from '../model/es-chart-request';
import { SidebarEntry } from 'app/monitoring/sidebar/sidebar-entry';

@Component({
  selector: 'sb-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  public menu: SidebarEntry[] = [
    {
      name: 'Charts',
      isCollapsible: false,
      links: [{
        name: 'Panel',
        href: 'panel',
        iconClass: 'fa fa-cube'
      }]
    },
    {
      name: 'Add Panel',
      isCollapsible: false,
      links: [{
        name: 'AddPanel',
        href: 'paneleditor',
        iconClass: 'fa fa-cube'
      }]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
