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


export class RawQuery{

  public should: Array<any>;
  public filter: Array<any>;
  public mustNot: Array<any>;
  public must: Array<any>;
  
  
  
  constructor(q_should: Array<any>, q_filter: Array<any>, q_mustNot: Array<any>, q_must: Array<any>) { 
    
    this.should = q_should;
    this.filter = q_filter;
    this.mustNot = q_mustNot;
    this.must = q_must;

  }

  to_json(){
    return JSON.stringify(this);
  }




    
}