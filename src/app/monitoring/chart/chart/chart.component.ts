import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Chart as ChartModel } from '../../model/chart';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { EschartsService } from '../../escharts.service';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { ChartingService } from '../../charting.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';




@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Output() refresh = new EventEmitter();
  @Output() chartDelete = new EventEmitter();
  @Input() requObj: ChartRequestVm;


  public isInAggregatedView = true;
  public showErrorMessage: boolean;
  public chart: ChartModel;
  public userIsAdmin: boolean;
  public userFlats: any;
  private filtersChangeSubscription: any;
  public tempChart: ChartModel;

  constructor(
    private esChartsService: EschartsService,
    private chartingService: ChartingService
  ) {

    }

  ngOnInit() {
    this.showErrorMessage = false;
    this.getChart();
  }

  public ngOnDestroy() {
  }

  private getChart() {
    if (this.requObj.isEs) {
      this.esChartsService.getChart(this.requObj as EsChartRequest).
      subscribe(data => {
        const aggregationResult = data.aggregationResults[0];
        const aggregations = data.aggregations;
        this.isInAggregatedView = data.showInAggregatedView;
        this.tempChart = new ChartModel();
        Object.keys(this.tempChart).forEach(k => {
          this.tempChart[k] = data[k];
        })
        this.updateChart({
          aggregations: aggregations,
          results: aggregationResult
        });
      });
    }
  }

  private updateChart(query: any): void {
      if (query.results && query.results.aggregations) {
          this.chart = this.chartingService.unwrapForPlotBucket(this.tempChart,
          query.aggregations[0],
          query.results.aggregations);
      }
      console.log(this.chart);
  }
}
