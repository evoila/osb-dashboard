import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Chart } from '../../model/chart';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { EschartsService } from '../../escharts.service';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';




@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  // @Output() refresh = new EventEmitter();
  // @Output() chartDelete = new EventEmitter();
  @Input() requObj: ChartRequest;


  public isInAggregatedView: boolean;
  public showErrorMessage: boolean;
  public chart: Chart;
  public userIsAdmin: boolean;
  public userFlats: any;
  private filtersChangeSubscription: any;
  public tempChart: Chart;

  constructor(
    private esChartsService: EschartsService,
    // private chartingService: ChartingService
  ) {

    }

  ngOnInit() {
    this.showErrorMessage = false;
    this.getChart();
    /*if (this.isInAggregatedView) {
    }*/
  }

  public ngOnDestroy() {
   /* if (this.isInAggregatedView) {
      this.filtersChangeSubscription.unsubscribe();
    }*/
  }


/*  public delete(chart: any): boolean {
    if (!window.confirm('Confirm removing chart')) {
      return false;
    }
    this.entityService.remove(chart)
      .subscribe(() => {
        this.chartDelete.emit();
      });
    return true;
  }
*/
  private getChart() {
    if (this.requObj.constructor.name === EsChartRequest.name) {
      this.esChartsService.getChart(this.requObj as EsChartRequest).
      subscribe(data => {
        console.log(data);
        //const aggregationResult = data[0].aggregationResult;
        //const aggregations = data[0].aggregations;
        this.tempChart = new Chart();
        Object.keys(new Chart()).forEach(k => {
          this.tempChart[k] = data[0][k];
        })
        /*this.updateChart({
          aggregations: aggregations,
          results: aggregationResult
        });*/
      });
    }
  }
  /*
  private runAggregation(aggregationQuery: any = JSON.parse(this.tempChart.aggregations[0].command), forceRefresh: boolean = false): void {
    const request = {
    body: aggregationQuery,
    index: [environment.esIndex + this.tempChart.searchObjectName.toLowerCase()],
    type: this.tempChart.searchObjectName,
    stored_fields: ['*'],
  };
    this.searchService.doSearch(request)
      .subscribe((results: any) => {
        this.updateChart({
          aggregations: request.body,
          results,
          forceRefresh
        });
    }, (error: any) => {
        this.tempChart = {
          ...this.tempChart,
          error,
          labels: null,
          data: null,
          series: null
        };
        this.updateChart({error});
    });
  }*/

  private updateChart(query: any): void {
      if (query.results && query.results.aggregations) {
       /* this.chartingService.unwrapForPlotBucket(this.tempChart,
          query.aggregations,
          query.results.aggregations);*/
      }

      this.chart = this.tempChart;
      console.log(this.chart);
      /*
      if (query.forceRefresh) { // when in aggr. view `this.refresh` is not provided so `.emit` results in no action
        this.refresh.emit({
          element: { type: 'chart', entity: this.chart },
          dashboard: this.isInAggregatedView,
          filtered: true
        });
      }

      if (query.error) {
        this.refresh.emit({error: query.error});
      }*/
  }
}
