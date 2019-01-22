export interface FileEndpoint {

    serviceInstance: any;
    name: string;
    username: string;
    password: string; 
    destinationType: string;
    filename: string;

}

export interface SwiftEndpoint extends FileEndpoint {

    authUrl: string;
    domain: string;
    containerName: string;
    projectName: string;
}

export interface S3Endpoint extends FileEndpoint {

    authKey: string;
    authSecret: string;
    region: string;
    bucket: string;
}
