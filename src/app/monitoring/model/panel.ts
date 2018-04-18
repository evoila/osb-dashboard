import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { ChartRequest } from './chart-request';
import { PrometheusChartRequest } from './prom-chart-request';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
export class Panel {
    panelId: String;
    serviceInstanceId: String;
    chartQueries: Array<ChartRequest>;
    chartView: Array<Array<ChartRequestVm>>;
    esChartQueries: Array<EsChartRequest>;
    promChartQueries: Array<PrometheusChartRequest>;
    name: string;
    description: String;
}
