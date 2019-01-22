import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-postgresql-settings',
  templateUrl: './postgresql-settings.component.html',
  styleUrls: ['./postgresql-settings.component.scss']
})
export class PostgresqlSettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["config"];
  readonly instanceGroupName: string = "postgres";

  constructor() { }

  ngOnInit() { }

}
