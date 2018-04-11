import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntityService } from 'app/core';
import { Chart } from './model/chart';


@Component({
  selector: 'sb-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public chart: Chart;

  constructor(
    private entityService: EntityService
  ) { }

  ngOnInit() {
  }

}
