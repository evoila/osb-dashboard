import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.scss']
})
export class RedisComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Configuration',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/redis',
        iconClass: 'fas fa-tachometer-alt'
      }]
  }];
  
  constructor() { }

  ngOnInit() {
  }

}