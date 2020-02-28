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
  public raw_query: RawQuery;
  
  
  
  constructor(id: number, name: string, raw_query: RawQuery) { 

    this.id = id;
    this.name = name;
    this.raw_query = raw_query;
  }

  to_json(){
    return JSON.stringify(this);
  }




    
}