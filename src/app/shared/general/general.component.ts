import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
  selector: 'sb-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  generalInfo: any = {};

  schema = {
    "properties": {
      "email": {
        "type": "string",
        "description": "email",
        "format": "email"
      },
      "password": {
        "type": "string",
        "description": "Password",
        "widget": "password"
      },
      "operatingSystem": {
        "type": "string",
        "widget": "radio",
        "oneOf": [
          {
            "enum": [
              "linux"
            ],
            "description": "GNU/Linux"
          },
          {
            "enum": [
              "osx"
            ],
            "description": "OSX"
          },
          {
            "enum": [
              "windows"
            ],
            "description": "Windows"
          },
          {
            "enum": [
              "other"
            ],
            "description": "Other"
          }
        ],
        "default": "other"
      },
      "rememberMe": {
        "type": "boolean",
        "default": false,
        "description": "Remember me"
      },
      "notificationsFrequency": {
        "type": "string",
        "description": "Notifications frequency",
        "widget": "select",
        "oneOf": [
          {
            "description": "Daily",
            "enum": [
              "daily"
            ]
          },
          {
            "description": "Weekly",
            "enum": [
              "weekly"
            ]
          },
          {
            "description": "Monthly",
            "enum": [
              "monthly"
            ]
          }
        ],
        "default": "daily"
      }
    },
    "required": ["email","password","rememberMe"],
    "buttons": [{
      "id": "alert",
      "label": "Alert!"
    },{
      "id": "reset",
      "label": "Reset!"
    }]
  }
  model = {
    email : "helloMoto"
  }

  formActions = {
    "alert": (property) => { alert(JSON.stringify(property.value)) },
    "reset": (property) => { property.reset() }
  }

  constructor(protected readonly generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.loadAll()
      .subscribe((info: any) => {
        this.generalInfo = info;
      });
  }
}
