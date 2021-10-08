import { Component, Input } from '@angular/core';
import { ListItemBase } from '../interfaces/list-item-base.component';

@Component({
  selector: 'sb-list-item-primitive',
  templateUrl: './list-item-primitive.component.html',
  styleUrls: ['./list-item-primitive.component.css']
})
export class ListItemPrimitiveComponent implements ListItemBase {
  @Input() data: number | string | boolean;
}
