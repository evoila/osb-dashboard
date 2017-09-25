import { Component, OnInit } from '@angular/core';
import { LBaasService } from './lbaas.service';

@Component({
  selector: 'sb-lbaas',
  templateUrl: './lbaas.component.html',
  styleUrls: ['./lbaas.component.scss']
})
export class LBaasComponent implements OnInit {
  configuration = {}

  constructor(readonly asService: LBaasService) { }

  ngOnInit() {
      this.asService
        .saveOne(this.configuration, 'certs');
    }

}
