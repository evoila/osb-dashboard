import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-cassandra',
  templateUrl: './cassandra.component.html',
  styleUrls: ['./cassandra.component.scss']
})
export class CassandraComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Configuration',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/kafka',
        iconClass: 'fas fa-tachometer-alt'
      }]
  }];
  
  constructor() { }

  ngOnInit() {
  }

}
