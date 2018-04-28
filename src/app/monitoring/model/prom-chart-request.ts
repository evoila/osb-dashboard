export class PrometheusChartRequest {
    chartId: String;
    metrics: Array<PrometheusMetrics>;
    end: Number;
    start: Number;
    step: String;
}
export class PrometheusMetrics {
    name: String;
    metricAndScope: Array<MetricAndScope> = [];
}
export class MetricAndScope {
    appId: String;
    metric: String;
}
