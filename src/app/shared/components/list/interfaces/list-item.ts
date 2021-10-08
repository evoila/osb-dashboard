import { Type } from '@angular/core';

export class ListItem {
  constructor(public component: Type<any>, public data: any) {}
}
