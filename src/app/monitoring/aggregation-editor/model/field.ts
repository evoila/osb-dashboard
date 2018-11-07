export class Field {
    // Name of the field eg. logMessage
    public key: string;
    // Type of the field eg. String
    public value: Type;
}
export interface Type {
    type: string;
}
