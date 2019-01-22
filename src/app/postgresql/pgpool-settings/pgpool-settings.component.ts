import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-pgpool-settings',
  templateUrl: './pgpool-settings.component.html',
  styleUrls: ['./pgpool-settings.component.scss']
})
export class PgpoolSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["child_life_time", "child_max_connections", "connection_life_time", "client_idle_limit"];
  readonly instanceGroupName: string = "pgpool";

  constructor() { }

  ngOnInit() { }

}
