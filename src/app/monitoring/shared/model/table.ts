import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';  
import { TableOptionsEntity } from '../../table-editor/model/table-options-entity'
import { ColumnDefinition } from 'app/monitoring/table-editor/model/column-definition';

export class Table{
	
readonly id?: String;
title: string;
boolQueryId: string;
authScope: CfAuthScope;
options: TableOptionsEntity;
columns: Array<ColumnDefinition>;
 
public constructor(title: string, columns: ColumnDefinition[]) { 
    this.title = name;
    this.columns = columns;
}

jsonify(){
    return JSON.stringify(this);
}

}

