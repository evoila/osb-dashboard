import { ServiceBinding } from '../../model/service-binding';
import { environment } from '../../../../environments/runtime-environment';
import { AuthScope } from './authScope';
import { KcAuthScope } from './kcAuthScope';

export interface CfAuthScope extends AuthScope {
  type: string;
  serviceInstanceId: string;
  orgId: string;
  spaceId: string;
  
}

export function authScopeFromBinding(binding: ServiceBinding, type: string = "cf"): AuthScope {
  //binding.organization_guid
  if (type == 'cf'){
    return {
      type,
      serviceInstanceId: environment.serviceInstanceId,
      orgId: binding.organization_guid,
      spaceId: binding.space,
      
    } as CfAuthScope
  }
  else if (type == 'kc'){
    return {
      type,
      serviceInstanceId: environment.serviceInstanceId,
      partnerId: binding.organization_guid,
      customerId: binding.space,
    } as KcAuthScope
  }
  else{ // unknown
    return {
      type,
      serviceInstanceId: environment.serviceInstanceId,
      partnerId: '',
      customerId: '',
    } as AuthScope
  }
  
  
}

