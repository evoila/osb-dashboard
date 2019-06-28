import { Directive, ElementRef, Input, ViewChild, Inject, OnInit, AfterViewInit, Output } from '@angular/core';
import { ChartInPanel } from '../../../model/chart-in-panel';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[sbResizer]'
})
export class ResizerDirective implements AfterViewInit {
  draghandleLeft: Element;
  draghandleRight: Element;
  @Input()
  onEdit: boolean;
  @Input('resizeChart')
  chart: ChartInPanel;
  @Input()
  containerId: string; // id of the container in which the element is living

  @Output()



  resizing: boolean = false;
  resizingLeft = true;
  x: number;

  constructor(private el: ElementRef, @Inject(DOCUMENT) private document) {
    this.draghandleLeft = document.createElement('i');
    this.draghandleLeft.style.cssText = `cursor: col-resize; width: 2px; background-color: black; height: 100%; float: left;`;
    el.nativeElement.prepend(this.draghandleLeft);

    this.draghandleRight = document.createElement('i');
    this.draghandleRight.style.cssText = `cursor: col-resize; width: 2px; background-color: black; height: 100%; float: right;`;
    el.nativeElement.append(this.draghandleRight);

    //adding a padding element that has no height but keeps the width when the chart
    // gets undisplayed for performance reasons
    el.nativeElement.append(document.createElement("div"));

    // Register Drag Listener for resizing
    this.draghandleLeft.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.onEdit) {
        this.resizing = true;
        this.resizingLeft = true;
        this.x = e.clientX;
        this.disableChart();
      }
    });

    this.draghandleRight.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.onEdit) {
        this.resizing = true;
        this.resizingLeft = false;
        this.x = e.clientX;
        this.disableChart();
      }
    });
  }
  ngAfterViewInit() {

    document.addEventListener('mouseup', e => {
      if (this.resizing) {
        this.resizing = false;
        this.enableChart();
      }
    });
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.resizing) {
        const widthPercentage = (this.el.nativeElement.offsetWidth / this.el.nativeElement.parentNode.offsetWidth) * 100;
        let diff = this.resizingLeft ? (e.clientX - this.x) : (this.x - e.clientX);
        diff *= 1.3; // multiplier for faster resize
        this.x = e.clientX;

        const diffPercent = (diff / this.el.nativeElement.parentNode.offsetWidth) * 100;
        this.el.nativeElement.style.cssText = `flex-basis: ${widthPercentage - diffPercent}%;`;
      }
    }
    );
  }
  /* Methode that disables the Chart Rendering
  This is necessary for resizing because the performance impact
  of live rerendering is huge */
  private disableChart() {
    const chart = this.el.nativeElement.childNodes[3];
    const height = this.el.nativeElement.offsetHeight;
    chart.style.cssText = "display: none;";
    const ele = this.el.nativeElement.childNodes[2];
    ele.style.cssText = `height: ${height}px;`;
  }

  /* birng back the chart after rezising */
  private enableChart() {
    const ele = this.el.nativeElement.childNodes[2];
    ele.style.cssText = `height: 0;`;
    const chart = this.el.nativeElement.childNodes[3];
    chart.style.cssText = "display: flex;";
  }
}
