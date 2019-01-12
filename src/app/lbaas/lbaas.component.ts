import { Component, OnInit } from '@angular/core';
import { LBaasService } from './lbaas.service';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-lbaas',
  templateUrl: './lbaas.component.html',
  styleUrls: ['./lbaas.component.scss']
})
export class LBaasComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'Configuration',
    isCollapsible: false,
    links: [{
      name: 'Settings',
      href: '/lbaas',
      iconClass: 'fas fa-tachometer-alt'
    }]
  },
  {
    name: 'Certificates',
    isCollapsible: false,
    links: [{
      name: 'Standard',
      href: '/lbaas/certificates',
      iconClass: 'fas fa-server'
    }, {
      name: 'Let\'s Encrypt',
      href: '/lbaas/letsencrypt',
      iconClass: 'fas fa-file-alt'
    }]
  }
  ];
  constructor() { }

  ngOnInit() { }

}