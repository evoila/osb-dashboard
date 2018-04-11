import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'sb-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  appName: String;
  constructor() { }

  ngOnInit() {
  }
  chooseApp(app) {
    this.appName = app;
  }
}
