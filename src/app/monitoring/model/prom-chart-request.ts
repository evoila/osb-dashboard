export class PrometheusChartRequest {
    chartId: string;
    metrics: Array<PrometheusMetrics>;
    end: number;
    start: number;
    step: string;
    size?: number;
    order: number;
    name: string;
}
export class PrometheusMetrics {
    name: string;
    metricAndScope: Array<MetricAndScope> = [];
}
export class MetricAndScope {
    appId?: string;
    appName?: string;
    appInstance?: number;
    space: string;
    metric: string;
}
