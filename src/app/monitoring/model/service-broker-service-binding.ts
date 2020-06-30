import { ServiceBinding } from "./service-binding";
import { CfAuthScope } from "../chart-configurator/model/cfAuthScope";

export interface ManagementPortalServiceBinding extends ServiceBinding{
    bindingId: string | null;
    appName: string;
    appId: string;
    authScope: CfAuthScope;
    timestamp: Number;
    deprecated: boolean;
    type: string;
  
    organization: string;
    space: string;

  }