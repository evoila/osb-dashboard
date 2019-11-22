export interface ServiceBinding {
  appName: string;
  appId: string;
  space: string;
  organization_guid: string;
  timestamp: Number;
  deprecated: boolean;
}
export interface SpaceAndOrg {
  space: string;
  org: string;
}
