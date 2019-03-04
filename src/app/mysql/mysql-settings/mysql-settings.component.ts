import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-mysql-settings',
  templateUrl: './mysql-settings.component.html',
  styleUrls: ['./mysql-settings.component.scss']
})
export class MysqlSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["innodb"];
  readonly instanceGroupName: string = "mysql";

  constructor() { }

  ngOnInit() {}

}
