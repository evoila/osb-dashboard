import { Component, Input } from '@angular/core';

@Component({
  selector: 'sb-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent {
  @Input() public icon: string;
  @Input() public title: string;
  @Input() public isLoading: boolean;
  @Input() public click: any;
  @Input() public disabled: boolean;
}
