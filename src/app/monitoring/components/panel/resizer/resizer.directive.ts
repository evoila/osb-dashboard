import { Directive, ElementRef, Input, ViewChild, Inject, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChartInPanel } from '../../../model/chart-in-panel';
import { DOCUMENT } from '@angular/platform-browser';
import { timer, Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Directive({
  selector: '[sbResizer]'
})
export class ResizerDirective implements AfterViewInit, OnDestroy {
  draghandleLeft: any;
  draghandleRight: any;
  // state after editing
  size: number;
  // state before editing
  initialSize: number;

  private subscriptions: Subscription[] = [];
  @Input()
  set onEdit(onEdit: Observable<boolean>) {
    this.subscriptions.push(onEdit.subscribe(k => {
      this.editing = k;
      if (k && this.draghandleLeft && this.draghandleRight && this.el) {
        this.initialSize = (this.el.nativeElement.offsetWidth / this.el.nativeElement.parentNode.offsetWidth) * 100;
        this.size = this.initialSize;
        this.draghandleRight.style.display = "inline";
        this.draghandleLeft.style.display = "inline";
      } else {
        this.draghandleRight.style.display = "none";
        this.draghandleLeft.style.display = "none";
      }
    }));
  }

  @Input()
  containerId: string; // id of the container in which the element is living

  // Event is emitted whenever a cancel or save is pressed
  // 'save' --> saving --> emitting size to upper component
  // 'cancel' --> resets size to initial value
  @Input()
  set editControls(controls: Observable<string>) {
    controls.subscribe(k => {
      if (k == 'save') {
        this.sizeEmitter.next(this.size);
      } else if (k == 'cancel') {
        this.setChartSize(this.initialSize);
      }
    })
  }

  @Output()
  sizeEmitter = new EventEmitter<number>();

  editing: boolean = false;
  debounceLock = false;
  resizing: boolean = false;
  resizingLeft = true;
  x: number;

  constructor(private el: ElementRef, @Inject(DOCUMENT) private document) {
    this.draghandleLeft = document.createElement('i');
    this.draghandleLeft.style.cssText = `cursor: col-resize; width: 2px; background-color: black; height: 100%; float: left;`;


    this.draghandleRight = document.createElement('i');
    this.draghandleRight.style.cssText = `cursor: col-resize; width: 2px; background-color: black; height: 100%; float: right;`;

    this.draghandleLeft.style.display = "none";
    this.draghandleRight.style.display = "none";

    this.el.nativeElement.append(this.draghandleLeft);
    this.el.nativeElement.append(this.draghandleRight);
    //adding a padding element that has no height but keeps the width when the chart
    // gets undisplayed for performance reasons
    this.el.nativeElement.append(document.createElement("div"));

    // Register Drag Listener for resizing
    this.draghandleLeft.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.editing) {
        this.resizing = true;
        this.resizingLeft = true;
        this.x = e.clientX;
        this.disableChart();
      }
    });

    this.draghandleRight.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.editing) {
        this.resizing = true;
        this.resizingLeft = false;
        this.x = e.clientX;
        this.disableChart();
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(k => k.unsubscribe());
  }
  ngAfterViewInit() {
    const cancelEditing = e => {
      if (this.resizing) {
        this.resizing = false;
        this.enableChart();
      }
    }

    window.addEventListener('mouseup', cancelEditing);
    window.addEventListener('mouseleave', cancelEditing);

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (e.buttons === 0) {
        cancelEditing(e);
      }
      if (this.resizing && !this.debounceLock) {
        this.debounceLock = true;
        const widthPercentage = (this.el.nativeElement.offsetWidth / this.el.nativeElement.parentNode.offsetWidth) * 100;
        let diff = this.resizingLeft ? (e.clientX - this.x) : (this.x - e.clientX);
        //diff *= 1.3; // multiplier for faster resize
        this.x = e.clientX;
        let diffPercent = (diff / this.el.nativeElement.parentNode.offsetWidth) * 100;
        if (diffPercent != 0) {
          if (diffPercent < 0) {
            if (widthPercentage < 50) {
              diffPercent = 50;
            }
            else if (widthPercentage >= 50) {
              diffPercent = 100;
            }
          } else if (diffPercent > 0) {
            if (widthPercentage == 100) {
              diffPercent = 50;
            } else {
              diffPercent = 33;
            }
          } else {
            diffPercent = widthPercentage;
          }
          this.size = diffPercent;
          this.setChartSize(diffPercent);

          timer(350, 351).pipe(take(1)).subscribe(k => {
            this.debounceLock = false;
          });
        } else {
          this.debounceLock = false;
        }

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
    chart.style.display = "none";
    const ele = this.el.nativeElement.childNodes[2];
    ele.style.cssText = `height: ${height}px;`;
  }

  /* birng back the chart after rezising */
  private enableChart() {
    const ele = this.el.nativeElement.childNodes[2];
    ele.style.cssText = `height: 0;`;
    const chart = this.el.nativeElement.childNodes[3];
    chart.style.display = "flex";
  }
  private setChartSize(size: number) {
    this.el.nativeElement.style.cssText = `flex-basis: ${size}%;`;
  }
}
