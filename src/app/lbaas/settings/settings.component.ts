import { Component, OnInit } from '@angular/core';
import { LBaasService } from '../lbaas.service';

@Component({
  selector: 'sb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  readonly formElements: Array<string> = ["stats", "timeout",
    "disable_http", "https_redirect_all", "https_redirect_domains"
  ];
  readonly instanceGroupName: string = "ha_proxy";

  public publicIp: any;

  constructor(readonly asService: LBaasService) { }

  ngOnInit() {
    this.asService.getPublicIp('fip')
      .subscribe((publicIp: any) => {
        this.publicIp = publicIp['publicIp'];
      });
  }
}
