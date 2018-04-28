import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Chart } from '../model/chart';
import { MetricAndScope, PrometheusChartRequest, PrometheusMetrics } from '../model/prom-chart-request';
import { query } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'sb-prom-query-editor',
  templateUrl: './prom-query-editor.component.html',
  styleUrls: ['./prom-query-editor.component.scss']
})
export class PromQueryEditorComponent implements OnInit {
  @Input()
  public choosenChart: Chart;
  @Output('success')
  success = new EventEmitter();
  @Output('cancel')
  cancel = new EventEmitter();
  private metricsAndScopes: Array<PrometheusMetrics> = [];
  private queryStrings: Array<String> = [];

  constructor() { }

  ngOnInit() {
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

  private replace(queryIndex: number, metricIndex: number, metric: MetricAndScope) {
    let query = new String(this.choosenChart.prometheusQueries[queryIndex]['query']);
    const strRegEx = 'metrics' + metricIndex;
    const regEx = new RegExp(strRegEx, 'g');
    const scopeAndMetric = metric.metric + '{app_id=\"' + metric.appId + '\"}';
    this.queryStrings[queryIndex] = query.replace(regEx, scopeAndMetric);
  }
  private buildChartRequest() {
    if (this.allSet()) {
      let promChartRequest = new PrometheusChartRequest();
      promChartRequest.chartId = this.choosenChart.id;
      promChartRequest.metrics = this.metricsAndScopes;
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
