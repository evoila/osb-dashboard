import { Component, OnInit } from '@angular/core';
import { SidebarEntry } from 'app/core/sidebar';

@Component({
  selector: 'sb-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.scss']
})
export class MysqlComponent implements OnInit {
  menu: SidebarEntry[] = [{
    name: 'MariaDB',
    isCollapsible: false,
    links: [{
        name: 'Settings',
        href: '/mysql',
        iconClass: 'fas fa-tachometer-alt'
      },{
      name: 'Users and Databases',
      href: '/mysql/mysql-users-and-dbs',
      iconClass: 'fas fa-tachometer-alt'
    }]
    }];

  constructor() { }

  ngOnInit() {
  }

}
