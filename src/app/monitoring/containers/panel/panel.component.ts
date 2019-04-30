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

  public panel: PanelVm;
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
    this.setDateRange();
  }
  toogleSidePanel() {
    if (this.sidePanelHidden) {
      this.sidePanelHidden = false;
      // toogle this rerender. Without this rerender works unreliable. Couldn't fix it any other way
      this.renderer.setStyle(this.chartcontainer.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '7fr 1fr');
      of(true).pipe(delay(100)).subscribe(k => {
        this.renderer.setStyle(this.chartcontainer.nativeElement, 'display', 'block');
      })

    } else {
      this.sidePanelHidden = true;
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '1fr 0px');
    }
  }
  editPanel() {
    const charts = this.panel.charts.reduce(
      (prev: ChartInPanel[], curr: ChartInPanel[], index, arr) => {
        if (index == 0) {
          return curr;
        } else {
          return [...prev, ...curr];
        }
      }
    )
    const newPanel = { ...this.panel, charts } as Panel;
    this.store.dispatch(new SetStateForUpdate(newPanel));
    this.router.navigate(['/monitoring/panelconfigurator']);
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
                return this.store.pipe(select(getPanelViewModelById, this.panel.id));
              })
            )
          })
        ).subscribe((k: PanelVm) => this.panel = k);
      });
    });

  }
  registerRouterEvents() {
    this.routerStore
      .select(getParams)
      .pipe(
        switchMap((params: Params) =>
          this.store
            .pipe(select(getPanelViewModelById, params['id']))
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
      .subscribe(k => {
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
