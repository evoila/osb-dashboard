import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-service-keys',
  templateUrl: './service-keys.component.html',
  styleUrls: ['./service-keys.component.scss']
})
export class ServiceKeysComponent implements OnInit { 
  menu: SidebarEntry[] = [
    {
      name: 'Overview',
      isCollapsible: false,
      links: [{
        name: 'Service Keys',
        href: '/service-keys',
        iconClass: 'fas fa-server'
      }]
    }
  ];

  constructor() {}

  ngOnInit() {}

}
