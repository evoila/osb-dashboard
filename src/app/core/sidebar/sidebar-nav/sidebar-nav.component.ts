import { ReplaySubject, Subject } from "rxjs";
import {
  Component,
  HostListener,
  OnInit,
  Input,
  Pipe,
  PipeTransform,
  Injectable,
  HostBinding,
} from "@angular/core";
import {
  SidebarEntry,
  SidebarLink,
  SidebarLinkWithClick,
} from "../sidebar-entry";
import { WindowService } from "../../window.service";

const breakpointXs = 768; // md-breakpoint
const mainNavbreakpoint = 991;

@Injectable({ providedIn: "root" })
export class ViewInformationService {
  /* Global, injectable service that gives information wether the user is
using a smartphone with a collapsed navigation or not. Use whenever
you need to know this in JS to render UI Elements differently
 */
  protected isSidebarNavInSmartphoneView: ReplaySubject<boolean> = new ReplaySubject(
    1
  );

  protected isMainNavInSmartphoneView: ReplaySubject<boolean> = new ReplaySubject(
    1
  );
  constructor() {
    this.isSidebarNavInSmartphoneView.next(false);
    this.isMainNavInSmartphoneView.next(false);
  }

  getIsSidebarNavInSmartphoneView(): Subject<boolean> {
    return this.isSidebarNavInSmartphoneView;
  }
  updateIsSidebarNavInSmartphoneView(val: boolean) {
    this.isSidebarNavInSmartphoneView.next(val);
  }
  getIsMainNavInSmartphoneView(): Subject<boolean> {
    return this.isMainNavInSmartphoneView;
  }
  updateIsMainNavInSmartphoneView(val: boolean) {
    this.isMainNavInSmartphoneView.next(val);
  }
}

@Pipe({
  name: "sidebarLinkNotActiveFilter",
})
@Injectable()
export class SidebarLinkNotActiveFilterPipe implements PipeTransform {
  transform(links: SidebarLink[]): SidebarLink[] {
    return links.filter((l) => l.isActiveLink === undefined || l.isActiveLink);
  }
}

@Component({
  selector: "sb-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.scss"],
})
export class SidebarNavComponent implements OnInit {
  @Input() public menu: SidebarEntry[];
  @Input() public title: string;

  @HostBinding("class.sidebar-nav-flex") public readonly flex = true;

  public isCollapsed = false;
  private mainCollapsed = false;
  private readonly _window: Window;

  constructor(windowRef: WindowService, private vis: ViewInformationService) {
    this._window = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.tryCollapse(this._window.innerWidth);
  }

  @HostListener("window:resize", ["$event"])
  public onResize(event) {
    this.tryCollapse(event.target.innerWidth);
  }

  private tryCollapse(width: number) {
    if (this.isCollapsed != width < breakpointXs) {
      this.isCollapsed = width < breakpointXs;
      this.vis.updateIsSidebarNavInSmartphoneView(this.isCollapsed);
    }
    if (this.mainCollapsed != width < mainNavbreakpoint) {
      this.mainCollapsed = width < mainNavbreakpoint;
      this.vis.updateIsMainNavInSmartphoneView(this.mainCollapsed);
    }
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
    section["isCollapsed"] = !section["isCollapsed"];
  }
}
