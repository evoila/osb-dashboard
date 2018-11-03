import { ExtensionUrl, Server } from "../app/core/extension-url";


// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {
    serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI0ZGZjNzYzMmQ3ODg0MjI5OGIxNDExOTRhNDJjNzU4ZSIsInN1YiI6IjY2NTFkOTgwLTYxOWYtNGY4NS04NGRjLTg5YzA4NTQ2NWMyNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI2NjUxZDk4MC02MTlmLTRmODUtODRkYy04OWMwODU0NjVjMjYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiYTFkNTYyN2ItYTgwNC00YjVjLTk0ZTYtMDA3OGQ0ZTQ1ODQ1IiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiMmJhNDY0OGEiLCJpYXQiOjE1NDEyNTQyMjcsImV4cCI6MTU0MTI1NDgyNywiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.UUrxQhE5zt_zGi9NtnO8Xm0V8inj_Wu7Mgne9yHNW7jOj-7vjdUqNY-IWCwULXiDga_ubexbIGSwORHVZzTZ7GWTeru_Gj46-Sve4BMJGUzY4JQLZltnawJRpMjj6XRB9cEjPEjN3s3IIGQBuU09a4beOucnKq9uulF-1lonIwulwdlWFSUE0pVxjShATVPEi5IG-0RwqySu-dAsRtr7h712LslX-zrs6bj2PiwYqA5QtUfcJJ8PhPgHIgh9vGZQwV-tZDUEoGttlMGatDFZy5-WMYyHP0mxm9buvVex_cFAUrYBKq-EAsSOxJa_JJWYM8nQSJ197GazoSwO9BZlDw',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host',
    },
    customEndpoints: [
      {"url":"http:\/\/localhost:8090","identifier":"log-metric-backend"},
      {"url":"http:\/\/localhost:8081","identifier":"osb-backup-manager"}
    ],
    ui: {
      title: 'Service Broker Panel',
      logoSrc: './assets/core/sb-white.svg'
    }
  } as Environment;
} else {

  seedEnv = {
    serviceInstanceId: '/*[[${serviceInstanceId}]]*/',
    token: '/*[[${token}]]*/',
    baseUrls: {
      serviceBrokerUrl: '/*[[${endpointUrl}]]*/',
    },
    ui: {
      title: 'Service Broker Panel',
      logoSrc: './assets/core/sb-white.svg'
    }
  } as Environment;

}

export interface Environment {
  serviceInstanceId: string;
  token: string;
  extensionUrls: ExtensionUrl;
  production: boolean;
  baseUrls: {
    serviceBrokerUrl: string;
  };
  customEndpoints: Array<Server>;
  ui: {
    title: string;
    logoSrc: string;
  };
};

// we use quoutes here because that makes it easier to copy config to nginx.conf or cf manifest files
// tslint:disable:quotemark


// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
