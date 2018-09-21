export class Singlestat {
  public path: string;
  public mainValue: number;
  public options: any;
  public datasource: any;
  public dashboard: any;
  public width: number;
  public queries: Array<any>;
  public aggregations: Array<any>;
  public _links = null;

  constructor() {
    this.options = {
      type: 'line',
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      legend: {
        title: null
      },
      xAxis: {
        title: {
          text: null
        }
      },
      yAxis: {
        title: {
          text: null
        }
      },
      prefix: {
        value: '',
        fontSize: null
      },
      infix: {
        fontSize: null
      },
      postfix: {
        value: '',
        fontSize: null
      },
      coloring: {
        background : null,
        colors: ['let 42dc12', 'let f1f124', 'let f12424']
      },
      sparkline: {
        show: true,
        lineColor: null,
        fillColor: null
      }
    };
    this.dashboard = {};
    this.datasource = {
      type : ''
    };
    this.aggregations = [{
      command : null
    }];
  }

}
