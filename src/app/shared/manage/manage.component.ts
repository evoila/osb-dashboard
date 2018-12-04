import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  menu: SidebarEntry[] = [
  {
    name: 'Overview',
    isCollapsible: false,
    links: [{
      name: 'Databases',
      href: '/manage',
      iconClass: 'fas fa-server'
    }]
  }];
  constructor() { }

  ngOnInit() {
  }

}
