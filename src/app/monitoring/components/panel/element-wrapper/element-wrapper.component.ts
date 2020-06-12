import { Component, OnInit, Input } from '@angular/core';
import { PanelElement } from 'app/monitoring/shared/model/panel-element';
import { ESBoolQueryResponse } from 'app/monitoring/table-editor/model/es-bool-query-result';
import { Store, select } from '@ngrx/store';
import { TableModelState } from 'app/monitoring/shared/store/reducers/table.reducer';
import { ChartModelState } from 'app/monitoring/shared/store/reducers/chart.reducer';
import { ChartingService } from 'app/monitoring/services/charting.service';
import { getAggregationResponseAndLoadedById } from 'app/monitoring/shared/store/selectors/chart.selector';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'sb-element-wrapper',
  templateUrl: './element-wrapper.component.html',
  styleUrls: ['./element-wrapper.component.scss']
})
export class ElementWrapperComponent implements OnInit {

  @Input('element')
  element: PanelElement;

  isChart = true; 
  finished_loading = false;
  table_es_data: Array<ESBoolQueryResponse>;

  constructor(
    private chartStore: Store<ChartModelState>
    ) { }

  ngOnInit() {
    this.isChart = this.element.type == 'chart';
    if (this.isChart){
      this.finished_loading = true;
    }
    else{
      this.get_table_es_data(this.element.id!!);
    }
    
  }

  get_table_es_data(id: string){

    this.get_data_from_store(id);
    
  }



  get_data_from_store(table_id: string){
    
      this.chartStore
        .pipe(select(getAggregationResponseAndLoadedById, table_id), filter(k => k != undefined), take(1))
          .subscribe(k => {
            this.table_es_data = k!!.results[0].response.hits.hits;
            this.finished_loading = true;
          });
          
  }









}
