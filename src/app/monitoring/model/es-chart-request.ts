import { ChartRequest } from './chart-request';

export class EsChartRequest implements ChartRequest {
    index: string; //ElastcSearch Index to Search in 
    doctype: string;
    appId: string;
    range: any;
    chartId: string;
    order: number;
    size?: number;
    name: string; 
}
