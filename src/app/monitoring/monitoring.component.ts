import { Component, OnInit } from '@angular/core';
import { Chart } from './model/chart';
import { Router } from '@angular/router';
import { SidebarEntry } from 'app/core/sidebar/sidebar-entry';
import { PanelState } from './shared/store/reducers/panel.reducer';
import { Store } from '@ngrx/store';
import { LoadPanels } from './shared/store/actions/panel.action';
import { getAllPanels } from './shared/store/selectors/panel.selector';
import { map, take, filter } from 'rxjs/operators';

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
      links: [
        {
          name: 'Panel Configurator',
          href: 'panelconfigurator'
        }
      ]
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

  constructor(private store: Store<PanelState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new LoadPanels());
    this.loadPanels();
  }

  loadPanels() {
    this.store
      .select(getAllPanels)
      .pipe(
        filter(data => data != []),
        map(data => {
          if (data) {
            this.menu[0].links = [];
            data.forEach(k => {
              const link = {
                name: k.name,
                href: 'panel/' + k.id!!,
                iconClass: 'icon-bar-chart'
              };
              if (!this.menu[0].links) {
                this.menu[0].links = [];
              }
              this.menu[0].links = [...this.menu[0].links, link];
            });
          }
          const link = {
            name: 'Add Panel',
            href: 'panelconfigurator',
            iconClass: 'fa fa-plus'
          };
          this.menu[0].links = [...this.menu[0].links, link];
          // directing to the first panel
          return this.menu[0].links[0]['href'];
        })
      )
      .subscribe(k => this.router.navigate(['monitoring/' + k]));
  }
}
