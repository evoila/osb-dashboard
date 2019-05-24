import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-zookeeper-settings',
  templateUrl: './zookeeper-settings.component.html',
  styleUrls: ['./zookeeper-settings.component.scss']
})
export class ZookeeperSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["config"];
  readonly instanceGroupName: string = "zookeeper";

  constructor() { }

  ngOnInit() { }

}
