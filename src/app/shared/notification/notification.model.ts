enum JobStatus {
    STARTED,
    RUNNING,
    UNKNOWN,
    FAILED,
    SUCCEEDED
}

interface SMTPConfig {
    id?: string;
    host: string;
    port: number;
    username: string;
    password: string;
}

interface EmailNotificationConfig {
    id?: string;
    triggerOn: JobStatus;
    serviceInstanceID: string;
    sendFromEmail: string;
    sendToEmail: string;
    template: string;
    smtpConfigId: string;
}

export {JobStatus, SMTPConfig, EmailNotificationConfig};
