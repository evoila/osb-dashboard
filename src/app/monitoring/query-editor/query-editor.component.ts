import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CatalogueService, ChartCatalogue } from '../catalogue.service';


@Component({
  selector: 'sb-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit {
  @Output('success')
  public success = new EventEmitter();
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
  public setChart(chartId: Chart) {
    this.choosenChart = chartId;
  }
  saveChart(chartRequest: any) {
    this.success.emit(chartRequest);
  }
  flushChart() {
    this.choosenChart = undefined;
  }

}
