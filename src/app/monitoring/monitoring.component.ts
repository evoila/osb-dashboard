import { Component, OnInit } from '@angular/core';
import { EntityService } from 'app/core';
import { Chart } from './model/chart';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { PanelService } from './panel.service';
import { environment } from '../../environments/runtime-environment';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarEntry } from 'app/core/sidebar/sidebar-entry';
import { ActivatedRoute } from '@angular/router/';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { reducers } from './store';

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
      links: [
        {
          name: 'logs',
          href: 'logs'
        }
      ]
    },
    {
      name: 'Charts',
      isCollapsible: false,
      links: [
        {
          name: 'configurator',
          href: 'configurator'
        }
      ]
    }
  ];

  constructor(
    private entityService: EntityService,
    private panelService: PanelService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPanels(false);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe(event => {
        this.loadPanels(true);
      });
  }

  loadPanels(linkEvent: boolean) {
    this.panelService
      .getAllPanels(environment.serviceInstanceId)
      .subscribe(data => {
        if (data) {
          this.menu[0].links = [];
          data.forEach(k => {
            const link = {
              name: k.name,
              href: 'panel/' + k.panelId,
              iconClass: 'icon-bar-chart'
            };
            if (!this.menu[0].links) {
              this.menu[0].links = [];
            }
            this.menu[0].links = [...this.menu[0].links, link];
          });
        }
        const link = {
          name: 'AddPanel',
          href: 'paneleditor',
          iconClass: 'fa fa-plus'
        };
        this.menu[0].links = [...this.menu[0].links, link];
        // directing to the first panel
        const firstLink = this.menu[0].links[0]['href'];
        if (!linkEvent) {
          this.router.navigate(['monitoring/' + firstLink]);
        }
      });
  }
}
