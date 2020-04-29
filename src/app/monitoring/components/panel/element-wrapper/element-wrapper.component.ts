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
    private chartingService: ChartingService,
    private tableStore: Store<TableModelState>,
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
    //.. when this.table_es_data is not null
    //this.finished_loading = true;
  }



  get_data_from_store(table_id: string){
    //console.log('AHA 0 -- ++');
      this.chartStore
        .pipe(select(getAggregationResponseAndLoadedById, table_id), filter(k => k != undefined), take(1))
        
        /*.pipe(
          distinctUntilChanged((prev, curr) => {
            const loaded = !!prev && !!curr && prev!!.loaded == curr!!.loaded && prev!!.loading == curr!!.loading;
            let data = loaded && prev!!.results.length == curr!!.results.length;
            console.log('AHA 0,5 -- ++');
            if (data) {
              console.log('AHA 1 -- ++');
              prev!!.results.forEach((element, index) => {
                if (!(element.id === curr!!.results[index].id)) {
                  data = false;
                  return false;
                }
              });
            }
            return data;
          }))
          */
          .subscribe(k => {

            //console.log('AHA 123 -- ++');
            //console.log(k!!.results[0].response.hits.hits);
            this.table_es_data = k!!.results[0].response.hits.hits;
            this.finished_loading = true;
          });
          
          
          /*,
          filter(k => k != undefined && Object.keys(k.results).length > 0),
          map(result => {
            return result!!.results.
              filter(k => k && k.response && k.response.hits.total > 0)
              .map(k => {
                return this.chartingService.unwrapForPlotBucket(
                  new ChartModel(),
                  k.request.aggregation.actualAggregation,
                  k.request.aggregation.name,
                  k.response.aggregations
                );
              });
          }),
          filter(charts => charts.length > 0),
          map(charts => {
            return charts.reduce((acc, chart, index, arr) => {
              if (index == 0) {
                return chart;
              } else {
                let labels = acc.labels;
                if (chart.labels > acc.labels) {
                  labels = chart.labels;
                }
                return {
                  ...acc,
                  data: [...acc.data, ...chart.data],
                  series: [...acc.series, ...chart.series],
                  labels: labels
                };
              }
            });
          }),
          map(chart => {
            return {
              ...chart,
              options: this.chart.chart.option,
              type: this.chart.chart.type
            };
          })
        )
        .subscribe(k => {
          if (this.chartView) {
            const { labels, data, series } = k;
            this.updateSubject.next({ labels, data, series });
          } else {
            this.chartView = k;
          }
        }*/
    
  }









}
