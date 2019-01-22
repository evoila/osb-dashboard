import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-postgresql-users-and-databases',
  templateUrl: './postgresql-users-and-databases.component.html',
  styleUrls: ['./postgresql-users-and-databases.component.scss']
})
export class PostgresqlUsersAndDatabasesComponent implements OnInit {
  readonly formElements: Array<string> = ["databases", "users"];
  readonly instanceGroupName: string = "postgres";
  readonly formLayout = [
    {
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
              "key": "databases[].users",
              "items": [
                {
                  "type": "string"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "key": "users",
      "type": "array",
      "items": [
        {
          "type": "div",
          "displayFlex": true,
          "flex-direction": "row",
          "items": [
            {
              "key": "users[].admin",
              "flex": "1 1 50px"
            },
            {
              "key": "users[].username",
              "flex": "4 4 200px",
              "notitle": true,
              "placeholder": "Username"
            },
            {
              "key": "users[].password",
              "flex": "4 4 200px",
              "notitle": true,
              "placeholder": "Password"
            }
          ]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() { }

}
