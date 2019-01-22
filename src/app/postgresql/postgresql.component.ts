import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-postgresql',
  templateUrl: './postgresql.component.html',
  styleUrls: ['./postgresql.component.scss']
})
export class PostgresqlComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'PostgreSQL',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/postgresql',
        iconClass: 'fas fa-tachometer-alt'
      },{
      name: 'Users and Databases',
      href: '/postgresql/postgresql-users-and-dbs',
      iconClass: 'fas fa-tachometer-alt'
    }]
    },{
      name: 'PGPool',
      isCollapsible: false,
      links: [{
          name: 'Settings',
          href: '/postgresql/pgpool-settings',
          iconClass: 'fas fa-tachometer-alt'
      }]
  }];
  
  constructor() { }

  ngOnInit() {}

}
