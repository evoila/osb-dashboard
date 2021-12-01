import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomEndpointService } from "app/core/custom-endpoint.service";
import { environment } from "environments/runtime-environment";
import { Observable } from "rxjs";
import { EmailNotificationConfig, SMTPConfig } from "./notification.model";

@Injectable()
export class NotificationService {
    private NOTIFICATION_BASEURL: string;

    constructor(private http: HttpClient,
        customEndpointService: CustomEndpointService){
        this.NOTIFICATION_BASEURL = customEndpointService
            .getUri('osb-backup-notification-service') as string;
    }

    public getServiceInstance(): string {
        return environment.serviceInstanceId;
    }

    // Notification

    public getAllNotificationConfigs(): Observable<EmailNotificationConfig[]> {
        return this.http.get<EmailNotificationConfig[]>(`${this.NOTIFICATION_BASEURL}/emailNotification/byInstance/${this.getServiceInstance()}`);
    }

    public getNotificationConfig(id: string): Observable<EmailNotificationConfig> {
        return this.http.get<EmailNotificationConfig>(`${this.NOTIFICATION_BASEURL}/emailNotification/${id}`);
    }

    public postNotificationConfig(config: EmailNotificationConfig): Observable<EmailNotificationConfig> {
        return this.http.post<EmailNotificationConfig>(`${this.NOTIFICATION_BASEURL}/emailNotification`, config);
    }

    public deleteNotificationConfig(id: string): Observable<any> {
        return this.http.delete(`${this.NOTIFICATION_BASEURL}/emailNotification/${id}`);
    }

    // SMTP

    public getAllSMTPConfigs(): Observable<SMTPConfig[]> {
        return this.http.get<SMTPConfig[]>(`${this.NOTIFICATION_BASEURL}/SMTPConfiguration`);
    }

    public postSMTPConfig(config: SMTPConfig): Observable<SMTPConfig> {
        return this.http.post<SMTPConfig>(`${this.NOTIFICATION_BASEURL}/SMTPConfiguration`, config);
    }

    public deleteSMTPConfig(id: string): Observable<any> {
        return this.http.delete(`${this.NOTIFICATION_BASEURL}/SMTPConfiguration/${id}`);
    }
}
