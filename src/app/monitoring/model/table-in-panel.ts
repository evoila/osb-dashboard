
import { PanelElement } from '../shared/model/panel-element';
import { Table } from '../shared/model/table';

export class TableInPanel extends PanelElement {
  readonly id?: string;
  table: Table;
  

  constructor(table: Table, order: number, size: number) { 
    super(order, size, 'table');
    this.table = table;
  }

}
