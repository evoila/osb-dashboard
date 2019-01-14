import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Field } from '../../../../aggregation-editor/model/field';
import { SearchService } from '../../../../shared/services/search.service';
import { ChartingUtilsService } from '../../../../aggregation-editor/charting-utils.service';

@Component({
  selector: 'sb-create-aggregation',
  templateUrl: './create-aggregation.component.html',
  styleUrls: ['./create-aggregation.component.scss']
})
export class CreateAggregationComponent implements OnInit {
  public fields$: Observable<Map<string, Array<Field>>>;
  @Input('type')
  public type: string;
  @Output('result')
  public result: EventEmitter<any> = new EventEmitter<any>();
  @Output('close')
  public close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly searchService: SearchService,
    private readonly chartingUtilsService: ChartingUtilsService
  ) {}

  ngOnInit() {
    this.fields$ = this.searchService.getMappingWithType();
  }

  public getResults(event: any) {
    if (event == 'cancel') {
      this.close.emit();
    }
    this.result.emit(event);
  }
}
