import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.scss']
})
export class KafkaComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Configuration',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/kafka',
        iconClass: 'fas fa-tachometer-alt'
      },{
      name: 'Users',
      href: '/kafka/kafka-users',
      iconClass: 'fas fa-tachometer-alt'
    }]
  },
  {
    name: 'Zookeeper',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/kafka/zookeeper-settings',
        iconClass: 'fas fa-tachometer-alt'
    }]
  }];
  
  constructor() { }

  ngOnInit() {}

}
