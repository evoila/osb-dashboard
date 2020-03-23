import { CfAuthScope } from "app/monitoring/chart-configurator/model/cfAuthScope"
import { RawQuery } from "./raw-query";


export class ESQuery_Request{

    public appId: string;
    public size: number;
    public authScope: CfAuthScope;
    public query: RawQuery;
    public from: number;

    public constructor(appId: string, size: number, authScope: CfAuthScope, query: RawQuery) { 

        this.appId = appId;
        this.size = size;
        this.authScope = authScope;
        this.query = query;
        this.from = 0;
      }
    
      jsonify(){
        return JSON.stringify(this);
      }
    
    

    
}