import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-rabbitmq-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["server"];
  readonly instanceGroupName: string = "rabbitmq";

  constructor() { }

  ngOnInit() {
    
  }
}
