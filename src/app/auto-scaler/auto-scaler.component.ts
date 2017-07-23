import { Component, OnInit } from '@angular/core';
import { Configuration } from './domain/configuration';

@Component({
  selector: 'sb-auto-scaler',
  templateUrl: './auto-scaler.component.html',
  styleUrls: ['./auto-scaler.component.scss']
})
export class AutoScalerComponent implements OnInit {
  configuration  = {
    minMaxRange: [1, 10],
    cpuLowerUpperLimit: [1, 100],
    ramLowerUpperLimit: [1, 100]
  };
  range = 10;
  minMaxConfig: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    step: 1,
    range: {
      min: 1,
      max: 25
    },
    pips: {
      mode: 'steps',
      density: 1
    }
  };
  lowerUpperConfig: any = {
    behaviour: 'drag',
    connect: true,
    margin: 5,
    step: 5,
    range: {
      min: 0,
      max: 100
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };

  constructor() { }

  ngOnInit() {}

}
