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
      "notitle" : true,
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
              "notitle": false,
              "placeholder": "Username"
            },
            {
              "type": "password",
              "key": "users[].password",
              "flex": "4 4 200px",
              "notitle": false,
              "placeholder": "Password"
            },
            {
              "type" : "array",
              "key" : "users[].topic_acls",
              "items" : [
                { "type": "text",
                  "key": "users[].topic_acls[].topic",
                  "flex": "4 4 200px",
                  "notitle": false,
                  "placeholder": "Topic"
                },
                {
                  "type": "text",
                  "key": "users[].topic_acls[].rights",
                  "flex": "4 4 200px",
                  "notitle": false,
                  "placeholder": "Alter, AlterConfigs, Create, Delete, Describe, DescribeConfigs, Read, Write"
                }
              ]
            },
            {
              "type" : "array",
              "key" : "users[].group_acls",
              "items" : [
                { "type": "text",
                  "key": "users[].group_acls[].group",
                  "flex": "4 4 200px",
                  "notitle": false,
                  "placeholder": "Group"
                },
                {
                  "type": "text",
                  "key": "users[].group_acls[].rights",
                  "flex": "4 4 200px",
                  "notitle": false,
                  "placeholder": "Delete, Describe, Read"
                }
              ]
            },
            {
              "type" : "array",
              "key" : "users[].cluster_acls",
              "maxItems" : 1,
              "items" : [
                {
                  "type": "text",
                  "key": "users[].cluster_acls[].rights",
                  "flex": "4 4 200px",
                  "notitle": false,
                  "placeholder": "Alter, AlterConfigs, ClusterAction, Create, Describe, DescribeConfigs, IdempotentWrite"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() { }

}
