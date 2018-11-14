import { FileEndpoint } from './file-endpoint';
import { BackupPlan } from './backup-plan';
export interface AbstractJob {

    id: string;
    startDate: Date;
    endDate: Date;
    serviceInstance: any;
    status: JobStatus;
    jobType: JobType;
    // Optional, only exists, if Backup Job succeeded
    destination: FileEndpoint;
    logs: string[];
    agentExecutionResponse: any[];
    backupPlan: BackupPlan;

}

enum JobType {
    BACKUP = "Backup",
    RESTORE = "Restore"
}

enum JobStatus {
    STARTED = "Started",
    RUNNING = "Running",
    UNKNOWN = "Unknown",
    FAILED = "Failed",
    SUCCEEDED = "Succeded"
}

export interface BackupJob extends AbstractJob {

    files: any;

}

export interface RestoreJob extends AbstractJob {

}