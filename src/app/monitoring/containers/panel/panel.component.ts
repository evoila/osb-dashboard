import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/services/es-timerange.service';

import { ChartRequest } from 'app/monitoring/model/chart-request';

import { filter, map, switchMap, take, delay } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PanelVm } from 'app/monitoring/shared/model/panel.vm';
import { PanelState } from 'app/monitoring/shared/store/reducers/panel.reducer';
import { Store, select } from '@ngrx/store';
import { getPanelViewModelById, getPanelById, getPanelState } from '../../shared/store/selectors/panel.selector';
import { State } from 'app/monitoring/store';
import { getParams } from '../../store/reducers/index';
import { Observable, Subject, of } from 'rxjs';
import { Panel } from '../../shared/model/panel';
import { ChartInPanel } from '../../model/chart-in-panel';
import { SetStateForUpdate, AddChartToPanel, FlushState } from '../../panel-configurator/store/actions/panel-increation.action';
import { PanelIncreationState } from 'app/monitoring/panel-configurator/store/reducers/panel-increation.reducer';
import { Chart } from '../../shared/model/chart';
import { buildFunctionalPanel } from '../../panel-configurator/store/selectors/panel-increation.selector';
import { UpdatePanel, LoadPanels, SavePanelSuccess } from '../../shared/store/actions/panel.action';
import { FirePanelAggregationRequest } from '../../shared/store/actions/chart.actions';


@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @ViewChild('container')
  container: ElementRef;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  sidePanelHidden = true;

  public panel: Panel;
  public menu: { [k: string]: any } = {};
  public toDateView: any = moment().unix();
  public fromDateView: any = moment().subtract(1, "days").unix();
  public steps: [string, string];
  public changed = false;
  private timeRangeEmitter$: Subject<any> = new Subject();
  public timeRange$: Observable<{ [key: string]: any }> = new Observable(k => this.timeRangeEmitter$.subscribe(k));
  edit: boolean;
  constructor(
    private timeRangeService: EsTimerangeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<PanelState>,
    private panelStore: Store<PanelIncreationState>,
    private routerStore: Store<State>,
    private renderer: Renderer2
  ) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }
  ngOnInit() {
    this.registerRouterEvents();


    this.timeRange$.subscribe(k => {
      if (this.panel) {
        this.store.dispatch(new FirePanelAggregationRequest(this.panel, k));
      }
    })

    this.setDateRange();
  }
  toogleSidePanel() {
    if (this.sidePanelHidden) {
      this.sidePanelHidden = false;
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '7fr 1fr');
    } else {
      this.sidePanelHidden = true;
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '1fr 0px');
    }
  }
  editPanel() {
    this.store.dispatch(new SetStateForUpdate(this.panel));
    this.router.navigate(['/monitoring/panelconfigurator']);
  }

  trackByFn(index, item) {
    return item.id;
  }

  drop(event: CdkDragDrop<Chart>) {
    this.store.pipe(select(getPanelById, this.panel.id)).pipe(take(1)).subscribe(k => {
      this.panelStore.dispatch(new SetStateForUpdate(k));
      this.panelStore.dispatch(new AddChartToPanel(event.item.data));
      this.panelStore.pipe(select(buildFunctionalPanel)).pipe(take(1)).subscribe(k => {
        this.store.dispatch(new UpdatePanel(k));
        this.panelStore.dispatch(new FlushState());
        this.store.pipe(select(getPanelState),
          filter(k => k.panelSaved),
          take(1),
          switchMap(k => {
            this.store.dispatch(new LoadPanels());
            return this.store.pipe(select(getPanelState),
              filter(k => k.panelsLoaded),
              take(1),
              switchMap(k => {
                return this.store.pipe(select(getPanelById, this.panel.id));
              })
            )
          })
        ).subscribe((k: Panel) => this.panel = k);
      });
    });

  }
  registerRouterEvents() {
    this.routerStore
      .select(getParams)
      .pipe(
        switchMap((params: Params) =>
          this.store
            .pipe(select(getPanelById, params['id']))
            .pipe(take(1))
        ),
        filter(
          (k: any) =>
            k != undefined &&
            k != {} &&
            (k.charts != null && k.charts != undefined)
        ),
        map(k => {
          return { ...k };
        })
      )
      .subscribe((k: Panel) => {
        this.panel = { ...k };
      });
  }

  setFromDate(date: any) {
    this.fromDateView = date;
    this.setDateRange();
  }
  setToDate(date: any) {
    this.toDateView = date;
    this.setDateRange();
  }
  setStep(step: [string, string]) {
    this.steps = step;
    this.setDateRange();
  }
  private setDateRange() {
    if (this.toDateView && this.fromDateView) {
      this.timeRangeEmitter$.next(this.timeRangeService.setTimeRange(
        this.fromDateView,
        this.toDateView
      ));
    }
  }

  private getDateAsString(date: any): string {
    return moment(date).format('DD:MM:YY, hh:mm:ss a');
  }

  private onDrop(dragData: CdkDragDrop<String[]>, target: ChartRequest) { }

  private editChart(chart: Chart, chartRequest: ChartRequest) {
    chartRequest['onEdit'] = true;
    chartRequest['choosenChart'] = chart;
  }

  private saveChartQuery(newRequest: ChartRequest, oldRequest: ChartRequest) { }
  private saveChanges() { }
}
