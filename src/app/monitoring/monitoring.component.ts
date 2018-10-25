import { Component, OnInit } from '@angular/core';
import { EntityService } from 'app/core';
import { Chart } from './model/chart';

import { PanelService } from './panel.service';
import { environment } from '../../environments/runtime-environment';
import { Router } from '@angular/router';
import { SidebarEntry } from 'app/core/sidebar/sidebar-entry';



@Component({
  selector: 'sb-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public chart: Chart;
  public menu: SidebarEntry[] = [
    {
      name: 'Panels',
      isCollapsible: false,
      links: []
    },
    {
      name: 'Logs',
      isCollapsible: false,
      links: [{
        name: 'logs',
        href: 'logs'
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
        if (data) {
          data.forEach(k => {
            const link = {
              name: k.name,
              href: 'panel/' + k.panelId,
              iconClass: 'icon-bar-chart'
            }
            if (!this.menu[0].links) {
              this.menu[0].links = [];
            }
            this.menu[0].links = [...this.menu[0].links, link];

          })
        }
        const link = {
          name: 'AddPanel',
          href: 'paneleditor',
          iconClass: 'fa fa-plus'
        }
        this.menu[0].links = [...this.menu[0].links, link];
        //directing to the first panel 
        const firstLink = this.menu[0].links[0]['href'];
        this.router.navigate(['monitoring/' + firstLink]);
      });
  }

}
