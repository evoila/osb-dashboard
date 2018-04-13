import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { Chart as ChartModel } from '../../model/chart';
import { Chart } from 'chart.js';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'sb-singlechart',
  templateUrl: './singlechart.component.html',
  styleUrls: ['./singlechart.component.scss']
})
export class SinglechartComponent implements OnInit, AfterViewInit {
  @Input() chart: ChartModel;
  @ViewChild('canvas') canvasElement: ElementRef;
  private canvas;
  public chartJs: Chart;
  constructor() { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.chart) {
      const chartJsObject = this.buildChartJsObject(this.chart);
      console.log(chartJsObject);
      this.canvas = this.canvasElement.nativeElement.getContext('2d');
      this.chartJs = new Chart(this.canvas, chartJsObject);
    }
  }
  private buildChartJsObject(chart: ChartModel): any {
    const labels = chart.labels;
    const data = chart.data;
    return {
      type: chart.type,
      data: {
        labels: labels,
        datasets: [{
           label:"test",
           backgroundColor: '',
           borderColor: 'rgba(255,99,132,1)',
           data: data
        }],

      borderWidth: 1
      },
      options: chart.options

    };
  }
}
