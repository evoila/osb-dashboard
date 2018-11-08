import { ExtensionUrl, Server } from "../app/core/extension-url";

// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {
    serviceInstanceId: 'DD69H8D3-7876-4056-A0EE-DE8D3498259T',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOTY0YmZkMzQ2NzY0NDZkOGM3OWE3NDdhNDg1MTM3MSIsInN1YiI6IjY2NTFkOTgwLTYxOWYtNGY4NS04NGRjLTg5YzA4NTQ2NWMyNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI2NjUxZDk4MC02MTlmLTRmODUtODRkYy04OWMwODU0NjVjMjYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiYTFkNTYyN2ItYTgwNC00YjVjLTk0ZTYtMDA3OGQ0ZTQ1ODQ1IiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiMmJhNDY0OGEiLCJpYXQiOjE1NDEyNTIxMzMsImV4cCI6MTY0MTI1MjczMywiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.aIlWoJcl1wbuCMjfgbm_mhk6MF7ur_6wrKEwpjYmhUY',
    baseUrls: {
      serviceBrokerUrl: 'http://localhost:8080',
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
  serviceInstance: any;
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
