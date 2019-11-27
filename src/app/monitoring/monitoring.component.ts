import { Component, OnInit } from '@angular/core';
import { Chart } from './model/chart';
import { Router } from '@angular/router';
import { SidebarEntry } from 'app/core/sidebar/sidebar-entry';
import { PanelState, getPanelsLoading } from './shared/store/reducers/panel.reducer';
import { Store } from '@ngrx/store';
import { LoadPanels, DeletePanel } from './shared/store/actions/panel.action';
import { getAllPanels, getPanelState } from './shared/store/selectors/panel.selector';
import { map, take, filter } from 'rxjs/operators';
import { LoadBindings, LoadBindingsSuccess } from './shared/store/actions/binding.action';
import { getState } from './store';


@Component({
  selector: 'sb-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public chart: Chart;
  private notYetNavigate = true;
  panelEditMode = false;



  // The Panels are getting an Edit Mode
  // This Listener is called when the corresponding Button within
  // The Navigation Bar is pressed.
  // Rerenders Navigation so that the panels are getting a delete Button
  editModeListener: Function = () => {
    this.panelEditMode = !this.panelEditMode;
    if (this.panelEditMode) {
      this.menu[0].links = this.menu[0].links.map((k, i, arr) => {
        // Last entry of this list is the Add Panel Interface which is not deletable
        if (i < arr.length - 1) {
          return {
            ...k, button: true,
            buttonFavicon: "fa-trash",
            buttonActionListener: this.deletePanel,
          }
        } else {
          return k;
        }
      });
    } else {
      this.quitPanelEditmode();
    }
    this.menu = [...this.menu]
  }

  private quitPanelEditmode(){
    this.menu[0].links = this.menu[0].links.map(k => {
      return {
        ...k, button: false,
        buttonFavicon: undefined,
        buttonActionListener: undefined,
      }
    });
  }

  public deletePanel = (panel: any) => {

    // href contains the id of the panel and has this format "panel/{}"
    const panelId = panel.href.replace(/panel\//, "");
    const panelName = panel.name;
    if (confirm(`Should the Panel ${panelName} be deleted`)) {
      this.store.dispatch(new DeletePanel(panelId));
      const tempSubscription = this.store.select(getPanelState).pipe(filter(k => !k.panelSaveing && k.panelSaved)).subscribe(k => {
        this.store.dispatch(new LoadPanels());
        tempSubscription.unsubscribe();
        this.editModeListener();
      })

    }
  }

  public menu: SidebarEntry[] = [
    {
      name: 'Panels',
      isCollapsible: false,
      button: true,
      buttonFavicon: "fa-edit",
      buttonActionListener: this.editModeListener,
      links: [
        {
          name: 'Add Panel',
          href: 'panelconfigurator',
          iconClass: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'Logs',
      isCollapsible: false,
      links: [
        {
          name: 'explore',
          href: 'explore'

        },
        {
          name: 'stream',
          href: 'stream'
        },
        {
          name: 'search',
          href: 'search'
        }
      ]
    },
    {
      name: 'Charts',
      isCollapsible: false,
      links: [
        {
          name: 'configurator',
          href: 'configurator'
        }
      ]
    }
  ];

  constructor(private store: Store<PanelState>, private router: Router) { }

  ngOnInit() {

    /*  TO DO:   EVALUATE WEATHER BINDINGS ARE ALIVE & write into boolean bindingsAlive */ 
    // nearly every container uses the bindings in some way or the other so we load them right away
    this.store.dispatch(new LoadBindings());
    this.store.dispatch(new LoadPanels());
    this.loadPanels();
    // end panel edit mode when other sidebar section or panelconfigurator gets clicked
    this.store.select(getState).pipe(filter(route => this.panelEditMode && (!route.url.includes('panel') || route.url.includes('configurator')))).subscribe((route: any) => {
        this.editModeListener(); // turning off panel edit mode
    })
  }

  
  loadPanels() {
    this.store
      .select(getAllPanels)
      .pipe(
        filter(data => data != []),
        map(data => {
          if (data) {
            this.menu[0].links = [];
            data.forEach(k => {
              const link = {
                name: k.name,
                href: 'panel/' + k.id!!,
                iconClass: 'icon-bar-chart'
              };
              if (!this.menu[0].links) {
                this.menu[0].links = [];
              }
              this.menu[0].links = [...this.menu[0].links, link];
            });
          }
          const link = {
            name: 'Add Panel',
            href: 'panelconfigurator',
            iconClass: 'fa fa-plus'
          };
          this.menu[0].links = [...this.menu[0].links, link];
          // directing to the first panel
          return this.menu[0].links[0]['href'];
        })
      )
      .subscribe(k => {
        this.notYetNavigate && this.router.navigate(['monitoring/' + k]);
        this.notYetNavigate = false;
      });
  }
}

