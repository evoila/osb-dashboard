import { Component, OnInit } from '@angular/core';
import { LBaasService } from '../lbaas.service';

@Component({
  selector: 'sb-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  readonly formElements: Array<string> = ["ssl_pem"];
  readonly instanceGroupName: string = "ha_proxy";
  readonly formLayout = [{
    "key": "ssl_pem",
    "type": "textarea",
    "placeholder": "Please enter your PEM file contents for your private key and your certificate here."
  }];
  public publicIp: any;

  constructor(readonly asService: LBaasService) { }

  ngOnInit() {
    this.asService.getPublicIp('fip')
      .subscribe((publicIp: any) => {
        this.publicIp = publicIp['publicIp'];
      });
  }
}
