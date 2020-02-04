import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';  
import { TableOptionsEntity } from '../../table-editor/model/table-options-entity'
import { ColumnMapping } from '../../table-editor/model/column-mapping'

export class Table{
	
readonly id?: String;
title: string;
authScope: CfAuthScope;
query: null;
options: TableOptionsEntity;
headers: Array<string>;
columns: Array<ColumnMapping>;
fields: Array<string>; // COLUMN DEFINITIONS !!  
	
}

