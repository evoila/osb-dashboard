import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Field } from '../aggregation-editor/model/field';
import { SearchService } from '../search.service';
import { ChartType } from 'app/monitoring/aggregation-editor/model/chartType';
import { ChartingUtilsService } from '../aggregation-editor/charting-utils.service';



@Component({
  selector: 'sb-create-aggregation',
  templateUrl: './create-aggregation.component.html',
  styleUrls: ['./create-aggregation.component.scss']
})
export class CreateAggregationComponent implements OnInit {
  private fieldEmitter: any;
  public fields: Observable<Array<Field>> = new Observable(e => this.fieldEmitter = e);
  public types: Array<ChartType>;

  constructor(private readonly searchService: SearchService,
    private readonly chartingUtilsService: ChartingUtilsService,
  ) {
    this.types = this.chartingUtilsService.chartTypes();
  }

  ngOnInit() {
    this.getFields();
  }

  private getFields() {
    this.searchService.getMappingWithType().subscribe((data) => {
      this.fieldEmitter.next(data);
    })
  }
  public getResults(event: any) {
    console.log(event);
  }
}
