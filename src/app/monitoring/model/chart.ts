import { PrometheusChartRequest } from "app/monitoring/model/prom-chart-request";


export class Chart {
  public id: string;
  public path: string;
  public type: string;
  public searchObjectName: string;
  public showInAggregatedView: boolean;
  public fieldToCount: string
  public datasource: any;
  public dashboard: any;
  public width: number;
  public options: any;
  public timespan: string;
  public labels: Array<any>;
  public series: Array<any>;
  public data: Array<any>;
  public queries: Array<any>;
  public aggregations: Array<any>;
  public prometheusResponse: Array<any>;
  public aggregationResults: any;
  public _links = null;
  public error: any;
  public esIndex?: string;
  public prometheusQueries: Array<string>;
  public name: string;
  public description: string;

  constructor() {
    this.error = null;
    this.width = 12,
    this.type = 'bar';
    this.timespan = '7d';
    this.searchObjectName = '';
    this.showInAggregatedView = false;
    this.fieldToCount = 'value';
    this.options = {
      title: {
        text: 'This is a sample Chart',
        display: true,
        position: 'top',
        padding: 20
      },
      tooltips: {
        enabled: true
      },
      legend: {
        fullWidth: true,
        enabled: true,
        position: 'right'
      },
      scales: {
        xAxes : [{
          display: false,
          scaleLabel: {
            display: false,
            labelString: ''
          }
        }],
        yAxes : [{
          display: false,
          scaleLabel: {
            display: false,
            labelString: ''
          }
        }]
      }
    };
    this.dashboard = {};
    this.datasource = {
      type : ''
    };
    this.labels = [];
    this.series = [];
    this.data = [];
    this.aggregations = [{
      command : null
    }];
  }

}
