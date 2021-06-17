import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-kafka-users',
  templateUrl: './kafka-users.component.html',
  styleUrls: ['./kafka-users.component.scss']
})
export class KafkaUsersComponent implements OnInit {
  readonly formElements: Array<string> = ["users"];
  readonly instanceGroupName: string = "kafka";
  readonly formLayout = [
    {
      "key": "users",
      "type": "array",
      "items": [
        {
          "type": "div",
          "displayFlex": true,
          "flex-direction": "row",
          "items": [
            { "type": "text",
              "key": "users[].username",
              "flex": "4 4 200px",
              "notitle": true,
              "placeholder": "Username"
            },
            {
              "type": "password",
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
