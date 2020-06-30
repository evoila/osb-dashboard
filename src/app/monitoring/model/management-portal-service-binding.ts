import { KcAuthScope } from "../chart-configurator/model/kcAuthScope";
import { ServiceBinding } from "./service-binding";

export interface ManagementPortalServiceBinding extends ServiceBinding{
    bindingId: string | null;
    appName: string;
    appId: string;
    authScope: KcAuthScope;
    timestamp: Number;
    deprecated: boolean;
    type: string;
  
    partner: string;
    customer: string;

  }
  