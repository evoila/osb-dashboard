import { ServiceBinding } from '../../model/service-binding';
import { environment } from '../../../../environments/runtime-environment';
export interface CfAuthScope {
  type: string;
  orgId: string;
  spaceId: string;
  serviceInstanceId: string;
}
export function authScopeFromBinding(binding: ServiceBinding, type: string = "cf"): CfAuthScope {
  binding.organization_guid
  return {
    type,
    orgId: binding.organization_guid,
    spaceId: binding.space,
    serviceInstanceId: environment.serviceInstanceId
  } as CfAuthScope
}