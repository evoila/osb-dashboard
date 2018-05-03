import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Chart as ChartModel } from '../../model/chart';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { EschartsService } from '../../escharts.service';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { ChartingService } from '../../charting.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import { PromChartingService } from '../../prom-charting.service';
import { PrometheusChartRequest } from '../../model/prom-chart-request';
import { PromchartsService } from '../../promcharts.service';




@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Output('chartDelete')
  chartDelete = new EventEmitter();
  @Output('editChart')
  editChart = new EventEmitter();
  @Input() requObj: ChartRequestVm;
  @Input() chartId: string;
  @Input() options: boolean;


  public isInAggregatedView = true;
  public errorMessage: string | null;
  public chart: ChartModel;
  public userIsAdmin: boolean;
  public userFlats: any;
  private showErrorMessage = false;
  private filtersChangeSubscription: any;
  public tempChart: ChartModel;

  constructor(
    private esChartsService: EschartsService,
    private chartingService: ChartingService,
    private promChartsService: PromchartsService,
    private promChartingService: PromChartingService
  ) { }

  ngOnInit() {
    this.getChart();
  }

  public ngOnDestroy() {
  }
  private edit() {
    if (this.chart) {
      this.editChart.emit(this.tempChart);
    }
  }

  private update() {
    this.getChart();
  }

  private getChart() {
    if (this.requObj.isEs) {
      this.requObj.chartId = this.chartId;
      this.esChartsService.getChart(this.requObj as EsChartRequest).
        subscribe(data => {
          const aggregationResult = data.aggregationResults[0];
          const aggregations = data.aggregations;
          this.isInAggregatedView = data.showInAggregatedView;
          if (aggregationResult.hits.total != 0) {
            this.tempChart = new ChartModel();
            Object.keys(this.tempChart).forEach(k => {
              this.tempChart[k] = data[k];
            })
            this.updateEsChart({
              aggregations: aggregations,
              results: aggregationResult
            });
          } else {
            this.errorMessage = 'No Data!'
          }

        }, error => {
          this.errorMessage = error;
        });
    } else {
      this.promChartsService.getCharts(this.requObj as PrometheusChartRequest, this.chartId).
        subscribe(data => {
          data = data['chart'];
          this.tempChart = data as ChartModel;
          this.chart = this.promChartingService.constructChart(data['prometheusResponses'], data['prometheusQueries'], this.tempChart);
          console.log(this.chart);
        });
    }
  }

  private updateEsChart(query: any): void {
    if (query.results && query.results.aggregations) {
      this.chart = this.chartingService.unwrapForPlotBucket(this.tempChart,
        query.aggregations[0],
        query.results.aggregations);
    }
  }
}
