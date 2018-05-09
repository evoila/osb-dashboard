import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityService } from 'app/core';
import { Chart } from './model/chart';
import { SidebarEntry } from 'app/monitoring/sidebar/sidebar-entry';
import { PanelService } from './panel.service';
import { environment } from '../../environments/runtime-environment';
import { Router } from '@angular/router';


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
      links: []
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
    private entityService: EntityService,
    private panelService: PanelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.panelService.getAllPanels(environment.serviceInstanceId).
      subscribe(data => {
        data.forEach(k => {
          const link = {
            name: k.name,
            href: 'panel/' + k.panelId,
            iconClass: 'fa fa-cube'
          }
          if (!this.menu[0].links) {
            this.menu[0].links = [];
          }
          this.menu[0].links = [...this.menu[0].links, link];
        })
        //directing to the first panel 
        const firstLink = this.menu[0].links[0]['href'];
        this.router.navigate(['monitoring/' + firstLink]);
      });
  }

}
