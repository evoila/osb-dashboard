import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModelState } from '../shared/store/reducers/table.reducer';

@Component({
  selector: 'sb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private store: Store<TableModelState>) { }

  tableName = "Tabellenname";

  ngOnInit() {
    this.updateTable();
  }



  private updateTable(): void {
  
  /*  this.store
      .pipe(select(getAggregationResponseAndLoadedById, this.chart.id))
      .pipe(
        distinctUntilChanged((prev, curr) => {
          const loaded = !!prev && !!curr && prev!!.loaded == curr!!.loaded && prev!!.loading == curr!!.loading;
          let data = loaded && prev!!.results.length == curr!!.results.length;
          if (data) {
            prev!!.results.forEach((element, index) => {
              if (!(element.id === curr!!.results[index].id)) {
                data = false;
                return false;
              }
            });
          }
          return data;
        }),
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
      });


      */
  }





}
