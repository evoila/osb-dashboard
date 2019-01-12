import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';
import { BuildTargetService } from '../build-target.service';

@Component({
  selector: 'sb-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  generalInfo: any = {};
  public readonly sharedModuleSupport: any;
  
  constructor(protected readonly generalService: GeneralService,
    buildTarget: BuildTargetService) { 
    this.sharedModuleSupport = buildTarget.sharedModuleSupport;
  }

  ngOnInit() {
    this.generalService.loadServiceInstance()
      .subscribe((info: any) => {
        this.generalInfo = info;
      });
  }
}
