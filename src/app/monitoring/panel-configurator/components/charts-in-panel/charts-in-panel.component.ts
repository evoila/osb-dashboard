import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PanelIncreationState } from '../../store/reducers/panel-increation.reducer';
import { Store } from '@ngrx/store';
import {
  AddChartToPanel,
  DeleteChartInPanel
} from '../../store/actions/panel-increation.action';

@Component({
  selector: 'sb-charts-in-panel',
  templateUrl: './charts-in-panel.component.html',
  styleUrls: ['./charts-in-panel.component.scss']
})
export class ChartsInPanelComponent implements OnInit {
  @Input('charts')
  public charts$: Observable<{ [id: string]: Chart }>;

  constructor(private store: Store<PanelIncreationState>) {}
  ngOnInit() {}

  drop(event: CdkDragDrop<Chart>) {
    this.store.dispatch(new AddChartToPanel(event.item.data));
  }

  delete(key: string) {
    this.store.dispatch(new DeleteChartInPanel(key));
  }
}
