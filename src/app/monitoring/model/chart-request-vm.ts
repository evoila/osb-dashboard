import { PrometheusMetrics } from 'app/monitoring/model/prom-chart-request';

export class ChartRequestVm {
    index: string;
    doctype: string;
    appId: string;
    range: any;
    interval: string;
    chartId: string;
    isEs: boolean;
    metrics: Array<PrometheusMetrics>;
    name: string;
    order: number;
    size: number;
    end: Number;
    start: Number;
    step: String;
}


