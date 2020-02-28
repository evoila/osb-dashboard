import { CfAuthScope } from "app/monitoring/chart-configurator/model/cfAuthScope"
import { ESQuery } from "./es-query";
import { RawQuery } from "./raw-query";


export class ESQuery_Request{

    public appId: string;
    public size: number;
    public authScope: CfAuthScope;
    public raw_query: RawQuery;
    public from: number;

    public constructor(appId: string, size: number, authScope: CfAuthScope, query: RawQuery) { 

        this.appId = appId;
        this.size = size;
        this.authScope = authScope;
        this.raw_query = query;
        this.from = 0;
      }
    
      jsonify(){
        return JSON.stringify(this);
      }
    
    

    
}