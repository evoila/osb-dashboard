import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-auto-scaler',
  templateUrl: './auto-scaler.component.html',
  styleUrls: ['./auto-scaler.component.scss']
})
export class AutoScalerComponent {
  menu: SidebarEntry[] = [{
    name: 'Dashboard',
    isCollapsible: false,
    links: [{
      name: 'Bindings',
      href: '/autoscaler',
      iconClass: 'fas fa-tachometer-alt'
    }]
  }
];

  constructor() { }

}
