import { ChartRequest } from './chart-request';

export class EsChartRequest implements ChartRequest {
    index: String; //ElastcSearch Index to Search in 
    doctype: String;
    appId: String;
    filter: Array<any>;
    interval: String;
}
