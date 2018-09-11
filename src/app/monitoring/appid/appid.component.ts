import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BindingService } from '../binding.service';
/*
* Fallback Textfield offers the possibility to Type-In AppID
* if the binding service is not available
*/
@Component({
  selector: 'sb-appid',
  templateUrl: './appid.component.html',
  styleUrls: ['./appid.component.scss']
})
export class AppidComponent implements OnInit {

  @Output('appName')
  appName = new EventEmitter<string>();
  appNames: Array<string> | null;
  fallBackTextfiled: string;
  choosen: string;
  constructor(public bindingService: BindingService) { }
  ngOnInit() {
    this.bindingService.getBindings().subscribe(
      (data) => this.appNames = (data ? data.map(k => k.applicationName) : data as null)
    )
  }
  private setChoosen() {
    if (this.choosen) {
      this.appName.next(this.choosen);
    }
  }
  private fallBackTextFieldUpdate() {
    if (this.fallBackTextfiled) {
      this.appName.next(this.fallBackTextfiled);
    }
  }
}
