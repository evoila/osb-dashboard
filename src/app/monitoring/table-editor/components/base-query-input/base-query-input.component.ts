// this component represents a single ES Query and the ability to create/select & test it

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-base-query-input',
  templateUrl: './base-query-input.component.html',
  styleUrls: ['./base-query-input.component.scss']
})
export class BaseQueryInputComponent implements OnInit {



  //scope: ServiceBinding = {} as ServiceBinding;
  
  // after set via dropdown-select or query-editor component,
  // ..query's name gets displayed and it gets automatically tested with selected app binding
  query: string;

  


  constructor() { }

  ngOnInit() {

  }
  

  // open ES Query Editor Container
  ceateQuery(){

  }

  // dud select a persisted elastic search query from db via drop down select
  did_select_query(es_query){
    

  }


}
