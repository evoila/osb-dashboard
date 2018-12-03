import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WidgetChooserComponent } from 'ngx-schema-form';

@Component({
  selector: 'sb-horizontal-navigation',
  templateUrl: './horizontal-navigation.component.html',
  styleUrls: ['./horizontal-navigation.component.scss']
})
export class HorizontalNavigationComponent implements OnInit {
  public _elements: Array<HorizontalNavViewModel>;
  public from: number;
  public to: number;

  public hidden = false;

  @Input()
  set elements(elements: Array<HorizontalNavViewModel>) {
    this._elements = elements;
    this.from = 0;
    if (elements.length - 1 < 4) {
      this.to = elements.length - 1;
    } else {
      this.to = 4;
    }
  }

  @Output()
  public choosenOptions: EventEmitter<
    HorizontalNavViewModel
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  calcBoundryArray(from: number, to: number) {
    let boundryArray: Array<number> = [];
    // make the modulus right on insert to avoid conditions where from is smaller then to
    for (let i = from; i <= to; i++) {
      boundryArray = [...boundryArray, mod(i, this._elements.length)];
    }
    return boundryArray;
  }

  // Action Listeners
  next() {
    this.from++;
    this.to++;
  }
  prev() {
    this.from--;
    this.to--;
  }
  choose(index: number) {
    this.choosenOptions.emit(this._elements[index]);
  }
}
// Special Modulus Function cause JavaScript's Mod gives (-2)%3 == -1.
function mod(n, m) {
  return ((n % m) + m) % m;
}
export interface HorizontalNavViewModel {
  name: string;
  id: string;
}
