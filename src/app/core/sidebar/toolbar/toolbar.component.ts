import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

}
