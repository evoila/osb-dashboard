import { Directive, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Input } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
  selector: '[sbSimpleChart]'
})
export class ChartDirective implements OnInit {
  public ctx: any;
  public chart: any;
  @Input()
  public chartObject: { [name: string]: any };

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, this.chartObject);
  }
}
