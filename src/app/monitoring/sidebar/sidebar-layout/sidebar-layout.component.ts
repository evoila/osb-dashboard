import { Component, ContentChild, Input } from '@angular/core';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
    selector: 'sb-sidebar-layout',
    templateUrl: './sidebar-layout.component.html',
    styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {
    @ContentChild(SidebarNavComponent)
    public sidenav: SidebarNavComponent;

    @Input()
    public isLoading: boolean = false;

    constructor() { }
}
