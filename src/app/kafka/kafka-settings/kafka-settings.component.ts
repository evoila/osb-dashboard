import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-kafka-settings',
  templateUrl: './kafka-settings.component.html',
  styleUrls: ['./kafka-settings.component.scss']
})
export class KafkaSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["security", "config"];
  readonly instanceGroupName: string = "kafka";

  constructor() { }

  ngOnInit() { }

}
