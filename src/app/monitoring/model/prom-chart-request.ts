export class PrometheusChartRequest {
    chartId: String;
    metrics: Array<PrometheusMetrics>;
}
export class PrometheusMetrics {
    name: String;
    metricAndScope: Array<MetricAndScope>;
}
class MetricAndScope {
    appId: String;
    metric: String;
}
