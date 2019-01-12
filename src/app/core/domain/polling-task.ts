export enum PollingStatus {
    FAILED = "FAILED",
    SUCCEEDED = "SUCCEEDED",
    RUNNING = "RUNNING",
    UNKNOWN = "UNKNOWN",
}

export interface PollingTask {

    id: string;

    name: string;

    operation: string;

    status: PollingStatus;

    startDate: Date;

    endDate?: Date;

}
