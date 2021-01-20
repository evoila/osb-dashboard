import { ExtensionUrl, Server } from "../app/core/extension-url";

// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {
    serviceInstanceId: 'f0c34eaf-2171-4334-85a6-e88acf4820f8',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLmNmLmV2b2lsYS5pby90b2tlbl9rZXlzIiwia2lkIjoia2V5LTEiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJjM2FjZTFhM2RkNjU0NzY1Yjg1NzRjM2NmYTcwNzhmMCIsInN1YiI6ImZhNzhhNTQ2LTJkMGMtNGEyOC1hZDVmLWZiOGJkYjlmZGZmMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiZmE3OGE1NDYtMmQwYy00YTI4LWFkNWYtZmI4YmRiOWZkZmYxIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWxAZXZvaWxhLmRlIiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJhdXRoX3RpbWUiOjE2MTExNDMzMDIsInJldl9zaWciOiI5YjcwNDYyZiIsImlhdCI6MTYxMTE0MzMwMywiZXhwIjoxNjExMTg2NTAzLCJpc3MiOiJodHRwczovL3VhYS5jZi5ldm9pbGEuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwib3NiLXBvc3RncmVzcWwtMTIuY2YuZXZvaWxhLmlvIiwiY2xvdWRfY29udHJvbGxlcl9zZXJ2aWNlX3Blcm1pc3Npb25zIl19.IuGY1qCJrVscXBt5quCM7f1j8MNFqQb8PiPSdXW9QLqrqzK5taw5kp3Rrn5VO8lJ0eWd6wBhLZzEXLVq17Rt48SWR7tvNNYfDwpbCzDH01_rJ_HTTBZIa6u7P8P-bDgpMd_iKQDKx5NJ_NQJE7B1EIQMbUIgCRiyiz1yNgFpP5dEJoHxkoJue-_-TlcbQif6PT0Pg4wEOFQpwDJWJligL6J6RO0dPh8y7lJJA1h6SRsrzsD8x_YQbRvuUQcZYBe1PKCYxDzSKg-KjbwlUgQwzDoBmM3Lyim_J-GPBQ_P_rcF4-LZGlwopFgnwEw5AKnhp5j5ni0Oi_SIeYwE911SoA',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-postgresql-12.cf.evoila.io',
    },
    customEndpoints: [
      {"url":"http://localhost:8090","identifier":"log-metric-backend"},
      {"url":"https://osb-backup-manager.cf.evoila.io","identifier":"osb-backup-manager"},
      {"url":"https://osb-autoscaler-core.cf.evoila.io","identifier":"osb-autoscaler-core"}
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
