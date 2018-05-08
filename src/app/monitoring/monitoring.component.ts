import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityService } from 'app/core';
import { Chart } from './model/chart';
import { SidebarEntry } from 'app/monitoring/sidebar/sidebar-entry';


@Component({
  selector: 'sb-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public chart: Chart;
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

  constructor(
    private entityService: EntityService
  ) { }

  ngOnInit() {
  }

}
