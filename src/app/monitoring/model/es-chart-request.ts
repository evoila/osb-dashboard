import { ChartRequest } from './chart-request';

export class EsChartRequest implements ChartRequest {
    index: string; //ElastcSearch Index to Search in 
    doctype: string;
    appId: string;
    filter: Array<any>;
    chartId: string;
}
