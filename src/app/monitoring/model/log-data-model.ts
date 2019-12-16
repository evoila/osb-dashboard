
export class LogDataModel {
  public _index: string;
  public _type: string;
  public _id: string;
  public _score?: number;
  public _source: Source;
}
export class Source {
  public timestamp: number;
  public logMessage: string;
  public logMessageType: string;
  public sourceType: string;
  public appId: string;
  public appName: string;
  public space: string;
  public organisation: string;
  public organizationGuid: string;
  public sourceInstance: number;
}
