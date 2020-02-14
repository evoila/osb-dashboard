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
    serviceInstanceId: '73047820-8d36-4323-bf2b-77dc887a707e',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI2OWI0ZGEwOGUyMzM0YjdjODY3NTE5MzNmNDYxMzIyZSIsInN1YiI6Ijg3ODM4ZDQ1LWU2NTMtNDE4Ny1iODAxLTBmMTE4MDRhYzAwOSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiODc4MzhkNDUtZTY1My00MTg3LWI4MDEtMGYxMTgwNGFjMDA5Iiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWwiLCJlbWFpbCI6ImpoZXlsQGV2b2lsYS5kZSIsImF1dGhfdGltZSI6MTU4MTY4MzU4NywicmV2X3NpZyI6ImIzNWY2NWIxIiwiaWF0IjoxNTgxNjgzNjA3LCJleHAiOjE1ODE3MjY4MDcsImlzcyI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwib3NiLWxvZy1tZXRyaWMtdGVzdC5zeXN0ZW0uY2YuaG9iLmxvY2FsIiwiY2xvdWRfY29udHJvbGxlcl9zZXJ2aWNlX3Blcm1pc3Npb25zIl19.Q2FJSC9yFYixPZSQXwb2qG-imQhewQV5Mus25yDYjS8Rw9F4e_0SLTMLyIASpKXK66Yk1rVV-3xcQFvxw-witcaFFxhI-yGA_p0MH_czCWzSxYj-iCWC-zGnGG_E6143zsR8OweqO8O7RJI2Vafy1FrOYMGGHbV27F66uZjiPyVPyM6a509piG4tgk6FJK6KStnDSNJ51Wksmedl6no7KBdRbHB3YAos06S4EhHZsW1uv3y1PaIdD4I-0vxsQ5cBRLUPWkX2pyQFycbeKha11gzGaszR6XFKvj2uZy6PqcVcRnV0keuTGU2jdfY7jsw-f9IgNToOn6-N7zVbOq-wkQ',

    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric-test.system.cf.hob.local'
    },
    production: false,
    customEndpoints: [
      //{url: 'https://osb-log-metric-dashboard-backend-test.system.cf.hob.local', identifier: 'log-metric-backend' },
      { url: 'http://localhost:8080', identifier: 'log-metric-backend' },
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
