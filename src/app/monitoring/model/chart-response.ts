import { Chart } from './chart';
export class ChartResponse {
    chart: Chart;
    failes: Array<FailedRequest>
}
export class FailedRequest {
    name: String;
    reason: String;
}
