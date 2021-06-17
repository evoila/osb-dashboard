import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-log4j-settings',
  templateUrl: './log4j-settings.component.html',
  styleUrls: ['./log4j-settings.component.scss']
})
export class Log4jSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["logging"];
  readonly instanceGroupName: string = "kafka";

  constructor() { }

  ngOnInit() { }

}
