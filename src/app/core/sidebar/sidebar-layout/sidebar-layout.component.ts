import { Component} from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sb-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {
  public isLoading: Observable<boolean>;

  constructor() {
  }
}
