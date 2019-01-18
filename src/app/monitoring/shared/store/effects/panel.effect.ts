import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PanelService } from '../../services/panel.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  LOAD_PANELS,
  LoadPanelsSuccess,
  LoadPanelsFailed
} from '../actions/panel.action';
import { of } from 'rxjs';
import {
  SAVE_PANEL,
  SavePanel,
  SavePanelSuccess,
  SavePanelFailed
} from '../actions/panel.action';

@Injectable()
export class PanelEffect {
  @Effect()
  loadAggregations$ = this.actions.ofType(LOAD_PANELS).pipe(
    switchMap(action =>
      this.panelService.getAllCharts().pipe(
        map(result => new LoadPanelsSuccess(result)),
        catchError(error => of(new LoadPanelsFailed()))
      )
    )
  );

  @Effect()
  saveAggregations$ = this.actions.ofType(SAVE_PANEL).pipe(
    switchMap((action: SavePanel) =>
      this.panelService.createChart(action.payload).pipe(
        map(k => new SavePanelSuccess()),
        catchError(error => of(new SavePanelFailed()))
      )
    )
  );
  constructor(private actions: Actions, private panelService: PanelService) {}
}
