import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Chart } from '../model/chart';
import { MetricAndScope, PrometheusChartRequest, PrometheusMetrics } from '../model/prom-chart-request';
import { CatalogueService } from '../catalogue.service';



@Component({
  selector: 'sb-prom-query-editor',
  templateUrl: './prom-query-editor.component.html',
  styleUrls: ['./prom-query-editor.component.scss']
})
export class PromQueryEditorComponent implements OnInit {
  @Input()
  public choosenChart: Chart;
  @Input()
  public chartRequest: PrometheusChartRequest
  @Output('success')
  success = new EventEmitter();
  @Output('cancel')
  cancel = new EventEmitter();
  public metricsAndScopes: Array<PrometheusMetrics> = [];
  public queryStrings: Array<String> = [];
  public sizeOptions: Array<number>;
  public size: number;
  public name: string;

  constructor(
    public catalogue: CatalogueService
  ) {
    this.sizeOptions = Array.from(new Array(12), (val, index) => index + 1);
  }

  ngOnInit() {
    if (this.chartRequest) {
      if (this.chartRequest.size) {
        this.size = this.chartRequest.size;
      }
      this.catalogue.getChartFromCatalogue(this.choosenChart.id).subscribe(k => {
        this.choosenChart = k['data'] as Chart;
        this.choosenChart.prometheusQueries.
          forEach(element => {
            let numberOfMetricPairs = 0;
            let query = new String(element['query']);
            this.queryStrings = [...this.queryStrings, query];
          });
      });
      this.metricsAndScopes = this.chartRequest.metrics;
    } else {
      this.choosenChart.prometheusQueries.
        forEach(element => {
          let numberOfMetricPairs = 0;
          let query = new String(element['query']);
          this.queryStrings = [...this.queryStrings, query];
          this.metricsAndScopes = [...this.metricsAndScopes, new PrometheusMetrics()];
          (query.match(/metrics/g) || []).
            forEach(k => {
              this.metricsAndScopes[this.metricsAndScopes.length - 1].metricAndScope[numberOfMetricPairs] = new MetricAndScope();
              numberOfMetricPairs++;
            })
        });
    }

  }

  private replace(queryIndex: number, metricIndex: number, metric: MetricAndScope) {
    let query = new String(this.choosenChart.prometheusQueries[queryIndex]['query']);
    const strRegEx = 'metrics' + metricIndex;
    const regEx = new RegExp(strRegEx, 'g');
    const scopeAndMetric = metric.metric + '{app_id=\"' + metric.appId + '\"}';
    this.queryStrings[queryIndex] = query.replace(regEx, scopeAndMetric);
  }
  private buildChartRequest() {
    if (this.allSet() && this.name) {
      let promChartRequest = new PrometheusChartRequest();
      promChartRequest.chartId = this.choosenChart.id;
      promChartRequest.metrics = this.metricsAndScopes;
      promChartRequest.name = this.name;
      if (this.size) {
        if (typeof this.size === 'string') {
          this.size = parseInt(this.size as string);
        }
        promChartRequest.size = this.size;
      }
      this.success.emit(promChartRequest);
    }
  }
  private cancelCreation() {
    this.cancel.emit();
  }
  private allSet(): boolean {
    return this.metricsAndScopes.every(element => {
      return element.metricAndScope.every(k => {
        if (k.appId && k.metric) {
          return true;
        }
        return false;
      })
    });
  }
}
