import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BindingService } from '../binding.service';

@Component({
  selector: 'sb-appid',
  templateUrl: './appid.component.html',
  styleUrls: ['./appid.component.scss']
})
export class AppidComponent implements OnInit {

  @Output('appName')
  appName = new EventEmitter<string>();
  appNames: Array<string>;
  choosen: string;
  constructor(public bindingService: BindingService) { }
  ngOnInit() {
    this.bindingService.getBindings().subscribe(
      (data) => this.appNames = data.map(k => k.applicationName)
    )
  }
  private setChoosen() {
    if (this.choosen) {
      this.appName.next(this.choosen);
    }
  }
}
