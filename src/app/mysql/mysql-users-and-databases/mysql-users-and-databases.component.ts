import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-mysql-users-and-databases',
  templateUrl: './mysql-users-and-databases.component.html',
  styleUrls: ['./mysql-users-and-databases.component.scss']
})
export class MysqlUsersAndDatabasesComponent implements OnInit {
  readonly formElements: Array<string> = ["databases"];
  readonly instanceGroupName: string = "mysql";
  readonly formLayout = [{
    "key": "databases",
    "type": "array",
    "items": [
      {
        "type": "div",
        "displayFlex": true,
        "items": [
          {
            "key": "databases[].name"
          },
          {
            "key": "databases[].username"
          },
          {
            "key": "databases[].password"
          }

        ]
      }
    ]
  }];

  constructor() { }

  ngOnInit() {}

}
