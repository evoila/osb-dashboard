import { CfAuthScope } from "app/monitoring/chart-configurator/model/cfAuthScope"
import { ESQuery } from "./es-query";

// send to "POST" "http://log-metric-backend-feature.system.cf.hob.local/v1/query"

export class ESQuery_Request{

    public appId: string;
    public size: number;
    public authScope: CfAuthScope;
    public query: JSON;
    
}