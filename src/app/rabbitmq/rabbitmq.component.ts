import { Component, OnInit } from '@angular/core';
import { RabbitMQService } from './rabbitmq.service';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-rabbitmq',
  templateUrl: './rabbitmq.component.html',
  styleUrls: ['./rabbitmq.component.scss']
})
export class RabbitMQComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Configuration',
    isCollapsible: false,
    links: [{
      name: 'Settings',
      href: '/rabbitmq',
      iconClass: 'fas fa-tachometer-alt'
    }]
  }
  ];
  constructor() { }

  ngOnInit() { }

}