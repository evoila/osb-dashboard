import { Component, OnInit, Optional, Output, EventEmitter, Injectable } from '@angular/core';
import { ColumnDefinition } from '../../model/column-definition';
import { ColumnBuilderComponent } from '../column-builder/column-builder.component';

import { ESQueryService } from '../../services/es-query.service';
import { MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ESQuery } from '../../model/es-query';
import { getQueriesState } from '../../store';
import { filter, take } from 'rxjs/operators';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}
export class FileFlatNode {
  constructor(
     public expandable: boolean, public filename: string, public level: number, public type: any) {}
}


/*
const TREE_DATA = JSON.stringify({
  Documents: {
     angular: {
        src: {
           compiler: 'ts',
           core: 'ts'
        }
     },
     material2: {
        src: {
           button: 'ts',
           checkbox: 'ts',
           input: 'ts'
        }
     }
  }
});
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }
  constructor() {
     this.initialize();
  }
  initialize() {
     const dataObject = JSON.parse(TREE_DATA);   
     const data = this.buildFileTree(dataObject, 0);
     this.dataChange.next(data);
  } 
  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
     return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new FileNode();
        node.filename = key;
        if (value != null) {
           if (typeof value === 'object') {
              node.children = this.buildFileTree(value, level + 1);
           } else {
              node.type = value;
           }
        }
        return accumulator.concat(node);
     }, []);
  }
}

*/


@Component({
  selector: 'sb-column-definition',
  templateUrl: './column-definition.component.html',
  styleUrls: ['./column-definition.component.scss']
})
export class ColumnDefinitionComponent implements OnInit {


  @Output('column')
  update_column = new EventEmitter<ColumnDefinition>();


  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;


  // all selectable datafields list maintained by Grandparent Table Editor Component 
  fields: Array<string>;
  cdef_name: string = "";
  cdef_path: any[];

  constructor(
    @Optional() public parent: ColumnBuilderComponent, 
                private store: Store<ESQuery>,
                private esQueryService: ESQueryService
                /*database: FileDatabase*/){
    
    this.fields = parent.fields;


    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    //database.dataChange.subscribe(data => this.dataSource.data = data);
  }


 transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
 }
 private _getLevel = (node: FileFlatNode) => node.level;
 private _isExpandable = (node: FileFlatNode) => node.expandable;
 private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
 hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;



  ngOnInit() {

    
    var testdata3 = {'a' : 'b', 'b': 'v', 'c': {'aso': 'okay', 'ichso': {'asox': 'okay', 'ichsox': ['a', '6', '1', 'ö', 'x']} } };
    
    //const keys = this.esQueryService.getKeys(testdata, [])
    //console.log(keys);
    //const keys3 = this.esQueryService.getKeys(testdata3, ['c', 'aso'])

    console.log(testdata3);
    const keys4 = this.esQueryService.buildKeyTree(testdata3);
    console.log(keys4);

    this.store.select(getQueriesState).pipe(filter(k => !k.queries.running)).pipe(take(1)).subscribe(k => {
      const esbq_run_result = k.queries.run_result;
      if (esbq_run_result != null){
        
        var data = esbq_run_result.responses;  //[0].hits.total; // + operator converting string to number
        this.dataSource.data = this.buildFileTree(data, 0);
      }
      else{
        this.dataSource.data = this.buildFileTree({'abbo': 'tanger'}, 0);
      }

    

    })
  }





  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
       const value = obj[key];
       const node = new FileNode();
       node.filename = key;
       if (value != null) {
          if (typeof value === 'object') {
             node.children = this.buildFileTree(value, level + 1);
          } else {
             node.type = value;
          }
       }
       return accumulator.concat(node);
    }, []);
 }

  public updatePreview(){
    const col_def = new ColumnDefinition(this.cdef_name, this.cdef_path)
    this.update_column.next(col_def);
  }


  public onGotFocusNameInput(){


  }

  public onLostFocusNameInput(){


  }
  public select_leaf(){

  }
  public select_node(){
    
  }

}
