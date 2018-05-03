export class PrometheusChartRequest {
    chartId: String;
    metrics: Array<PrometheusMetrics>;
    end: number;
    start: number;
    step: String;
    size?: number;
    order: number;
}
export class PrometheusMetrics {
    name: String;
    metricAndScope: Array<MetricAndScope> = [];
}
export class MetricAndScope {
    appId: String;
    metric: String;
}
