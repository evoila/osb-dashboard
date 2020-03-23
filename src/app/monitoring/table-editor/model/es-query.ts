import { RawQuery } from "./raw-query";

/*
  {
    "should": [],
    "filter": [],
    "mustNot": [],
    "must": [
      {
        "match": {
          "_index": "*-logmessages"
        }
      }
    ]
  }
  */


export class ESQuery{

  public id: number;
  public name: string;
  public boolQuery: RawQuery;
  
  
  constructor(id: number, name: string, boolQuery: RawQuery) { 

    this.id = id;
    this.name = name;
    this.boolQuery = boolQuery;
  }

  to_json(){
    return JSON.stringify(this);
  }




    
}