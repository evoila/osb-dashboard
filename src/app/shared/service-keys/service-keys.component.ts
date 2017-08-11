import { Component, OnInit } from '@angular/core';
import {ServiceKeysService} from "./service-keys.service";

@Component({
  selector: 'sb-service-keys',
  templateUrl: './service-keys.component.html',
  styleUrls: ['./service-keys.component.scss']
})
export class ServiceKeysComponent implements OnInit {
  serviceKeys: [any];

  constructor(protected readonly service: ServiceKeysService) { }

  ngOnInit() {
    this.service.loadAll()
      .subscribe((keys_page: any) => {
        this.serviceKeys = keys_page.content;
      });
  }

  create(): void {
    this.service.create()
      .subscribe((key: any) => {
        this.serviceKeys.push(key);
      });
  }
}
