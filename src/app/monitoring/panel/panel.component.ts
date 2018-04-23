import { Component, OnInit } from '@angular/core';
import { PanelService } from 'app/monitoring/panel.service';
import { environment } from 'environments/runtime-environment';
import { Panel } from 'app/monitoring/model/panel';
import { ChartType } from 'chart.js';
import { Event } from '@angular/router/src/events';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';

@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public panels: Array<Panel>;
  public panel: Panel;
  public menu: { [k: string]: any } = {};
  public columns = 3;
  constructor(private panelService: PanelService) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }

  ngOnInit() {
    this.panelService.getAllPanels(environment.serviceInstanceId).
      subscribe(data => {
        console.log(data);
        this.panels = data;
        if (this.panels && this.panels.length) {
          this.setPanel(this.panels[0]);
        }
      });
  }

  public setPanel(panel: Panel) {
    this.panel = panel;
    if (!this.panel.chartQueries) {
      this.panel.chartQueries = [];
    }
    if (this.panel.esChartQueries) {
      this.panel.chartQueries = [...this.panel.chartQueries, ...this.panel.esChartQueries];
    }
    if (this.panel.promChartQueries) {
      this.panel.chartQueries = [...this.panel.chartQueries, ...this.panel.promChartQueries];
    }
    this.buildView();
  }
  public changeColumns(columns: number) {
    this.columns = columns;
    this.panel.chartView = [];
    this.buildView();
  }
  private buildView() {
    //Method that builds up view with given Number of Rows
    let i = 0;
    let u = 0;
    if (!this.panel.chartView) {
      this.panel.chartView = [];
    }
    for (let chartQuerie of this.panel.chartQueries) {
      const isEs = chartQuerie['appId'] != null;
      let chartRqVm: ChartRequestVm = new ChartRequestVm();
      chartRqVm = Object.assign(chartQuerie);
      chartRqVm.isEs = isEs;
      if (this.panel.chartView[u]) {
        this.panel.chartView[u] = [...this.panel.chartView[u], chartRqVm]
      } else {
        this.panel.chartView[u] = [chartRqVm]
      }
      i++;
      if (i % this.columns === 0) {
        u++
      }
    }

  }

}
