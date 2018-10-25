import { Component, Input } from '@angular/core';

@Component({
  selector: 'sb-toolbar-link',
  templateUrl: './toolbar-link.component.html',
  styleUrls: ['./toolbar-link.component.scss']
})
export class ToolbarLinkComponent {
  @Input() public icon: string;
  @Input() public title: string;
  @Input() public routerLink: string | string[];
  @Input() public queryParams: any;
}
