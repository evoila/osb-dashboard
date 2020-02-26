// this component is just a dropdown select element, offering the ability to select a persisted ES Query via its name 

import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GetESQueriesState } from '../../store/reducers/query.reducer';
import { ESQuery } from '../../model/es-query';
import { Store } from '@ngrx/store';
import { getAllQueriesEntities } from '../../store/selectors/queries.selector';
@Component({
  selector: 'sb-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.scss']
})
export class QuerySelectComponent implements OnInit {
  @Output('query')
  query = new EventEmitter<ESQuery>();
  

  @Input('selected')
  query_name: string;

  queries: Array<ESQuery> | null;
  queries$: Observable<Array<ESQuery> | null>;

  choosen: number = -1;
  constructor(
    // in constructor of app id component BindingService gets initialized but not used --> find out about
    // public getPersistedESQueriesService: GetPersistedESQueriesService,
    private store: Store<GetESQueriesState>
  ) { }


  ngOnInit() {
    this.queries$ = this.store.select(getAllQueriesEntities);
    this.queries$.subscribe((data: Array<ESQuery>) => {
      if (data.length === 0) {
        console.log('no persisted queries found')
      }
      this.queries = [...data];
      this.choosen = data!!.map((query, index) => {
          return { query, index };
        })
        .filter(query => query.query.name == this.query_name)
        .map(k => k.index)[0];

      this.choosen = this.choosen == -1 || !this.choosen ? 0 : this.choosen;

    })

  }
  public setChoosen() {
    this.query.next(this.queries!![this.choosen]);
  }



}
