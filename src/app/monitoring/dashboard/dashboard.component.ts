import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Chart } from '../model/chart';
import { Singlestat } from 'app/monitoring/model/singlestat';
import { EntityService } from '../../core/entity.service';
import { ChartComponent } from '../chart/chart/chart.component';

@Component({
  selector: 'sb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dashboards: Array<any>;
  public dashboard: any;
  public elementToRender: any;
  constructor(
    private ref: ChangeDetectorRef,
    private entityService: EntityService) {

  }

  ngOnInit() {
    this.renderContent();
  }

  private renderContent(): void {

  }
}
