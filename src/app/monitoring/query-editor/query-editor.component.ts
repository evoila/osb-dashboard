import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CatalogueService, ChartCatalogue } from '../catalogue.service';
import { ChartRequest } from '../model/chart-request';
import { Chart } from '../model/chart';


@Component({
  selector: 'sb-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {
  @Output('esSuccess')
  public esSuccess = new EventEmitter();
  @Output('promSuccess')
  public promSuccess = new EventEmitter();
  public catalogues: ChartCatalogue;
  public choosenChart?: Chart;
  public appId: string;
  constructor(private catalogue: CatalogueService) { }

  ngOnInit() {
    this.catalogue.getCatalogue().subscribe(data => {
      this.catalogues = data;
      console.log(data);
    });
  }
  public setChart(chart: Chart) {
    this.choosenChart = chart;
  }
  saveEsChart(chartRequest: any) {
    this.esSuccess.emit(chartRequest);
  }
  savePromChart(chartRequest: any) {
    this.promSuccess.emit(chartRequest);
  }

  flushChart() {
    this.choosenChart = undefined;
  }

}
