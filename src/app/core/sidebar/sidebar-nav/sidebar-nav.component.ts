import { Component, HostListener, OnInit, AfterViewInit, Input, Pipe, PipeTransform, Injectable, HostBinding} from '@angular/core';
import { SidebarEntry, SidebarLink, SidebarLinkWithClick } from '../sidebar-entry';
import { WindowService } from '../../window.service';

const breakpointXs = 768; // md-breakpoint

@Pipe({
  name: 'sidebarLinkNotActiveFilter'
})
@Injectable()
export class SidebarLinkNotActiveFilterPipe implements PipeTransform {
  transform(links: SidebarLink[]): SidebarLink[] {
    return links.filter(l => l.isActiveLink === undefined || l.isActiveLink);
  }
}

@Component({
  selector: 'sb-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  @Input() public menu: SidebarEntry[];
  @Input() public title: string;


  @HostBinding('class.sidebar-nav-flex') public readonly flex = true;

  public isCollapsed = false;
  private readonly _window: Window;

  constructor(
    windowRef: WindowService
  ) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.tryCollapse(this._window.innerWidth);
  }

  onAfterViewInit(){
    // hide unneccessary UI Elements
    this.checkPanelSection();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.tryCollapse(event.target.innerWidth);
  }

  private tryCollapse(width: number) {
    this.isCollapsed = width < breakpointXs;
  }

  public onNavigate(link: SidebarLink) {
    this.tryCollapse(this._window.innerWidth);
    const clickable = <SidebarLinkWithClick>link;
    if (clickable.onClicked) {
      clickable.onClicked();
    }
  }

  public toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  public toggleSectionCollapsed(section: SidebarEntry) {
    if (!section.isCollapsible) {
      return;
    }

    // that's not nice
    section['isCollapsed'] = (!section['isCollapsed']);
  }

  private checkPanelSection(){
    // if  first item in menu array only contains one link, it must be the "Add Panel" navItem 
    //so there are no defined Panels, so we don't need no edit-panel-button next to the sectin header
    if ((this.menu[0]["links"]).length == 1){
      this.menu[0]["button"] = false;
    }
  }
}