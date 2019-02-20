import { ExtensionUrl, Server } from '../app/core/extension-url';

// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn(
    'DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?'
  );
  seedEnv = {
    serviceInstanceId: '48385b97-672d-414e-8da7-795077009813',
    token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MjIwODFhNjMyMzE0MGNmOTVmODIxMmEzMjJmNjkwYiIsInN1YiI6IjY2NTFkOTgwLTYxOWYtNGY4NS04NGRjLTg5YzA4NTQ2NWMyNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI2NjUxZDk4MC02MTlmLTRmODUtODRkYy04OWMwODU0NjVjMjYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiYTFkNTYyN2ItYTgwNC00YjVjLTk0ZTYtMDA3OGQ0ZTQ1ODQ1IiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiMmJhNDY0OGEiLCJpYXQiOjE1NDEyNjU0ODIsImV4cCI6MTY0MTI2NjA4MiwiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.xW2yFS4dttWbYgKogPgMLl26gVE0fSfdJSgr8AmSguE',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host'
    },
    production: false,
    customEndpoints: [
      { url: 'https://osb-log-metric-dashboard-backend.cf.dev.eu-de-central.msh.host', identifier: 'log-metric-backend' },
      { url: 'http://localhost:8081', identifier: 'osb-backup-manager' }
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
      serviceBrokerUrl: '/*[[${endpointUrl}]]*/'
    },
    production: true,
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
}

// we use quoutes here because that makes it easier to copy config to nginx.conf or cf manifest files
// tslint:disable:quotemark

// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
