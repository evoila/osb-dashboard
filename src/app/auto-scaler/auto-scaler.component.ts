import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-auto-scaler',
  templateUrl: './auto-scaler.component.html',
  styleUrls: ['./auto-scaler.component.scss']
})
export class AutoScalerComponent implements OnInit {
  range = 10;

  constructor() { }

  ngOnInit() {
  }

}
