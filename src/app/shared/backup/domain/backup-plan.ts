import { FileEndpoint } from './file-endpoint';
import { DbEndpoint } from './db-endpoint';
export interface BackupPlan {

    // Do not provide during creation
    id: string;
    name: string;
    compression: boolean;
    paused: boolean;
    frequency: string;
    retentionStyle: string;
    retentionPeriod: number;    
    items: Array<string>; 
    // Either number of files, or hours, or days or whatever
    destination: FileEndpoint;
    source: DbEndpoint;

}
