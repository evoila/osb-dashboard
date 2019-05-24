import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-cassandra-settings',
  templateUrl: './cassandra-settings.component.html',
  styleUrls: ['./cassandra-settings.component.scss']
})
export class CassandraSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["child_life_time", "child_max_connections", "connection_life_time", "client_idle_limit"];
  readonly instanceGroupName: string = "cassandra";

  constructor() { }

  ngOnInit() {
  }

}
