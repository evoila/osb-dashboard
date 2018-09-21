import { Component, HostListener, OnInit, Input } from '@angular/core';
import { SidebarEntry, SidebarLink, SidebarLinkWithClick } from '../sidebar-entry';
import { WindowService } from '../../window.service';

const breakpointXs = 768; // md-breakpoint

@Component({
  selector: 'sb-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  @Input() public menu: SidebarEntry[];
  @Input() public title: string;

  public isCollapsed = false;
  private readonly _window: Window;

  constructor(windowRef: WindowService) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.tryCollapse(this._window.innerWidth);
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
}
