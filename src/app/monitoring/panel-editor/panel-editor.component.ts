import { Component, OnInit } from '@angular/core';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';

@Component({
  selector: 'sb-panel-editor',
  templateUrl: './panel-editor.component.html',
  styleUrls: ['./panel-editor.component.scss']
})
export class PanelEditorComponent implements OnInit {
  chartQueries: Array<ChartRequestVm>
  name: string;
  description: string;
  constructor() { }

  ngOnInit() {
  }

}
