import { Component, OnInit } from '@angular/core';
import { ListItemPrimitiveComponent } from 'app/shared/components/list/list-item-primitive/list-item-primitive.component';

@Component({
  selector: 'sb-notification-configuration-overview',
  templateUrl: './notification-configuration-overview.component.html',
  styleUrls: ['./notification-configuration-overview.component.scss']
})
export class NotificationConfigurationOverviewComponent implements OnInit {

  rows = [
    [
      { component: ListItemPrimitiveComponent, data: 'one' },
      { component: ListItemPrimitiveComponent, data: 'two' },
      { component: ListItemPrimitiveComponent, data: 'three' }
    ],
    [
      { component: ListItemPrimitiveComponent, data: '2one' },
      { component: ListItemPrimitiveComponent, data: '2two' },
      { component: ListItemPrimitiveComponent, data: '2three' }
    ],
    [
      { component: ListItemPrimitiveComponent, data: '4one' },
      { component: ListItemPrimitiveComponent, data: '4two' },
      { component: ListItemPrimitiveComponent, data: '4three' }
    ]
  ]

  headers = [
    'title',
    'class',
    'age'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
