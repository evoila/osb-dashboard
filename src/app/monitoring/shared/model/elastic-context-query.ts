import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
export class ElasticContextQuery {
    authScope: CfAuthScope;
    timestamp: number;
    appId: string;
    sourceInstance: number;
    index: string;
    size: number;
}