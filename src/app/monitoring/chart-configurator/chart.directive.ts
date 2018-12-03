import { Directive, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Directive({
  selector: '[sbSimpleChart]'
})
export class ChartDirective implements OnInit {
  public ctx: any;
  public chart: any;
  @Input()
  public chartObject: any;

  // Input as observable
  @Input()
  public observableInput: Observable<any>;
  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.ctx = this.element.nativeElement.getContext('2d');

    if (this.chartObject) {
      this.chart = new Chart(this.ctx, this.chartObject);
    } else if (this.observableInput) {
      this.observableInput.subscribe(chart => {
        this.chart = new Chart(this.ctx, chart);
      });
    }
  }
}
