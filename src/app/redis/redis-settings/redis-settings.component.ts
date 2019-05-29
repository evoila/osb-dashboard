import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-redis-settings',
  templateUrl: './redis-settings.component.html',
  styleUrls: ['./redis-settings.component.scss']
})
export class RedisSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["config", "limits", "store"];
  readonly instanceGroupName: string = "redis";

  constructor() { }

  ngOnInit() {
  }

}
