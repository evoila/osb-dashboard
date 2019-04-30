import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { ChartOptionsEntity } from '../../../model/chart-options-entity';
import { ExampleChartsService } from '../../../services/example-charts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  
  private chartEmitter: any;
  public chart$: Observable<any>;
  public options: ChartOptionsEntity;

  constructor(
    private store: Store<fromStore.ChartIncreationAction>,
    private exampleChartsService: ExampleChartsService
  ) {
    this.chart$ = Observable.create(observer => {
      this.chartEmitter = observer;
    });
  }

  ngOnInit() {
    this.store
      .select(fromStore.getChartIncreationOptionsSet)
      .subscribe((loaded: boolean) => {
        if (loaded) {
          this.store
            .select(fromStore.getChartIncreationOptions)
            .subscribe((options: ChartOptionsEntity) => {
              this.options = options;
              this.store
                .select(fromStore.getChartIncreationType)
                .subscribe((type: string) => {
                  this.chartEmitter.next(
                    this.exampleChartsService.generateChartFromTypeAndOptions(
                      type,
                      this.options.options
                    )
                  );
                });
            });
        }
      });
  }
}
