import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-appid',
  templateUrl: './appid.component.html',
  styleUrls: ['./appid.component.scss']
})
export class AppidComponent implements OnInit {
  appId: String;
  @Output('appId')
  appIdEmitter = new EventEmitter();

  public emit() {
    if (this.appId) {
      this.appIdEmitter.emit(this.appId);
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
