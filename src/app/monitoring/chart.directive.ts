import {
  Directive,
  OnInit, OnDestroy, OnChanges,
  SimpleChanges,
  EventEmitter, ElementRef,
  Input, Output
} from '@angular/core';

import { DateFormatPipe } from './pipe/date-format.pipe';

declare var Chart: any;

@Directive({
  // tslint:disable-next-line
  selector: 'canvas[sb-chart]',
  exportAs: 'sb-chart',
  providers: [ DateFormatPipe ]
})
export class ChartDirective implements OnInit, OnChanges, OnDestroy {
  private ctx: any;
  private cvs: any;
  private parent: any;
  private chart: any;
  private initFlag: boolean = false;
  private element: ElementRef;
  public labels: Array<any> = [];
  public series: Array<any>;

  @Input() set labelsArray(labelsArr: Array<any>) {
    if (!labelsArr || labelsArr.length === 0) {
      this.labels = [];
    } else {
      this.labels = labelsArr.map(label => {
        return this.dateFormat.transform(label);
      });
    }
  }

  @Input() set seriesArray(seriesArr: Array<any>) {
    this.series = seriesArr;
  }

  @Input() public data: Array<any>;
  @Input() public colours: Array<any> = [];
  @Input() options: any = { responsive: true };
  @Input() public type: string;

  @Output() public chartClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() public chartHover: EventEmitter<any> = new EventEmitter<any>();

  private backgroundColors: Array<string> = [
    'rgba(151,187,205,1)', 'rgba(220,220,220,1)', 'rgba(247,70,74,1)',
    'rgba(70,191,189,1)', 'rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)'
  ];
  private hoverBackgroundColors: Array<string> = [
    'rgba(151,187,205,0.8)', 'rgba(220,220,220,0.8)', 'rgba(247,70,74,0.8)',
    'rgba(70,191,189,0.8)', 'rgba(253,180,92,0.8)', 'rgba(148,159,177,0.8)', 'rgba(77,83,96,0.8)'
  ];
  private defaultsColours: Array<any> = [
    {
      hoverBorderColor: 'rgba(151,187,205,0.2)',
      borderColor: 'rgba(151,187,205,1)',
      backgroundColor: 'rgba(151,187,205,1)',
      hoverBackgroundColor: 'rgba(151,187,205,0.8)'
    }, {
      hoverBorderColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      backgroundColor: 'rgba(220,220,220,1)',
      hoverBackgroundColor: 'rgba(220,220,220,0.8)'
    }, {
      hoverBorderColor: 'rgba(247,70,74,0.2)',
      borderColor: 'rgba(247,70,74,1)',
      backgroundColor: 'rgba(247,70,74,1)',
      hoverBackgroundColor: 'rgba(247,70,74,0.8)'
    }, {
      hoverBorderColor: 'rgba(70,191,189,0.2)',
      borderColor: 'rgba(70,191,189,1)',
      backgroundColor: 'rgba(70,191,189,1)',
      hoverBackgroundColor: 'rgba(70,191,189,0.8)'
    }, {
      hoverBorderColor: 'rgba(253,180,92,0.2)',
      borderColor: 'rgba(253,180,92,1)',
      backgroundColor: 'rgba(253,180,92,1)',
      hoverBackgroundColor: 'rgba(253,180,92,0.8)'
    }, {
      hoverBorderColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      backgroundColor: 'rgba(148,159,177,1)',
      hoverBackgroundColor: 'rgba(148,159,177,0.8)'
    }, {
      hoverBorderColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      backgroundColor: 'rgba(77,83,96,1)',
      hoverBackgroundColor: 'rgba(77,83,96,0.8)'
    }];

  constructor(element: ElementRef, public dateFormat: DateFormatPipe) {
    this.element = element;
  }

  ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.cvs = this.element.nativeElement;
    this.parent = this.element.nativeElement;
      this.refresh();

  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): any {
      if (this.chart)  {
        this.chart.destroy();
        this.chart = null;
      }
      this.initFlag = false;

    if (!this.initFlag) {
      this.refresh();
    }
  }

  getColour(colour: Array<number>): any {
    return {
      backgroundColor: this.rgba(colour, 0.6),
      borderColor: this.rgba(colour, 0.5),
      hoverBackgroundColor: this.rgba(colour, 1),
      hoverBorderColor: this.rgba(colour, 0.8)
    };
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rgba(colour: Array<number>, alpha: number): string {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  private getChartBuilder(ctx: any, data: Array<any>, options: any): any {
    if (!options.onClick) {
      options.onClick = (event: any, active: Array<any>) => {
        this.chartClick.emit({ event, active });
      };
    }
    options.hover = options.hover || {};
    if (!options.hover.onHover) {
      options.hover.onHover = (active: Array<any>) => {
        if (active && !active.length) {
          return;
        }
        this.chartHover.emit({ active });
      };
    }

    if (options.scales && options.scales.xAxes) {
      this.fixAxes('xAxes', options);
    }

    if (options.scales && options.scales.yAxes) {
      this.fixAxes('yAxes', options);
    }

    this.initFlag = true;
    return new Chart(ctx, {
      type: this.type,
      data: data,
      options: options
    });
  }

  private fixAxes(axisName, optionsObj) {
    if (optionsObj.scales[axisName].length === 0) { return optionsObj; }


     optionsObj.scales[axisName].forEach((axis, index) => {
        if (!axis.scaleLabel) {
          axis.scaleLabel = { display: false, labelString: ''};
        }
        if (axisName === 'yAxes') {
          axis.ticks = { beginAtZero: true}
        }

      });

      return optionsObj;
  }

  private addScales(options: any): void {
    if (!options.singlestat) {
      options.scales = {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      };
    }
  }

  private refresh(): void {
    const hasData = this.data && this.data.length > 0;
    const hasType = this.type != null;
    const hasCtx = this.ctx != null;
    const hasLabels = this.labels != null && this.labels.length > 0;
    let hasSeries = false;
    if (this.type === 'line' || this.type === 'bar' || this.type === 'radar')
      hasSeries = this.series != null && this.series.length > 0;
    else
      hasSeries = true;

    const isComplete = hasData && hasType && hasCtx && hasLabels && hasSeries;
    const datasets: Array<any> = [];

    if ((this.type === 'line'
      || this.type === 'bar'
      || this.type === 'radar') && isComplete) {

      // this.addScales(this.options);

      for (let i = 0; i < this.data.length; i++) {

        const colourDesc: Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
        const colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);

        const data: any = (<any>Object).assign(colour, {
          label: this.series[i],
          fill: false,
          data: this.data[i]
        });

        datasets.push(data);
      }
    } else if ((this.type === 'pie'
      || this.type === 'doughnut'
      || this.type === 'polarArea') && isComplete) {

      const backgroundColors: Array<string> = [];
      const hoverBackgroundColors: Array<string> = [];

      for (let i = 0; i < this.data.length; i++) {
        const colourDesc: Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
        backgroundColors.push(i < this.colours.length ?
          this.colours[i] : this.backgroundColors[i] || this.rgba(colourDesc, 0.8));
        hoverBackgroundColors.push(i < this.colours.length ?
          this.colours[i] : this.hoverBackgroundColors[i] || this.rgba(colourDesc, 0.8));
      }

      const data: any = (<any>Object).assign({
        data: this.data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors
      });
      datasets.push(data);
    }

    const data: any = {
      labels: this.labels,
      datasets: datasets
    };

    this.options.maintainAspectRatio = false;
    this.options.responsive = true;

    if (isComplete && !this.initFlag) {
      this.chart = this.getChartBuilder(this.ctx, data, this.options);
    } else if (isComplete && this.initFlag) {
      this.chart.config.data = data;
      this.chart.update();
    }

  }
}
