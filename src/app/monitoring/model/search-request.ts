export class SearchRequest {
    public range?: TimeRange;
    public appId: string;
    public docSize?: DocSize;
    public query?: string;
    public filter: [Map<string, any>]
}
export interface TimeRange {
    from: number
    to: number
}
export interface DocSize {
    size: number
    from: number
}
