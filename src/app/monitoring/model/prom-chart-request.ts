export class PrometheusChartRequest {
    chartId: String;
    metrics: Array<PrometheusMetrics>;
}
class PrometheusMetrics {
    name: String;
    metricAndScope: Array<MetricAndScope>;
}
class MetricAndScope {
    appId: String;
    metric: String;
}
