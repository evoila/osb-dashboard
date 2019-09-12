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
    token:
      'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI1ZjI5MzUxNDk5Njc0MDdjYWY4OTZiNzIwM2VhNzQzOSIsInN1YiI6Ijg3ODM4ZDQ1LWU2NTMtNDE4Ny1iODAxLTBmMTE4MDRhYzAwOSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiODc4MzhkNDUtZTY1My00MTg3LWI4MDEtMGYxMTgwNGFjMDA5Iiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWwiLCJlbWFpbCI6ImpoZXlsQGV2b2lsYS5kZSIsImF1dGhfdGltZSI6MTU2ODIxMDQyNCwicmV2X3NpZyI6IjE1ODMzZWQ4IiwiaWF0IjoxNTY4MjExMTA5LCJleHAiOjE1NzgyNTQzMDksImlzcyI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwib3NiLWxvZy1tZXRyaWMtdGVzdC5zeXN0ZW0uY2YuaG9iLmxvY2FsIiwiY2xvdWRfY29udHJvbGxlcl9zZXJ2aWNlX3Blcm1pc3Npb25zIl19.TFEdvfwnGE6qibHkhZ5C7Hk-Pb0C2xgpOR_gS0kEXU_EJOGFWSBcfpTLDCg4qJQDp8thfy0imCE8EaE4OYnmkygO2Igw5H_t49z0_0StK3lfPdqmM8SCCkaFt_WrbB44KkXaDdz0_7V-0qhsO3cPJakzIqF3qDLSd_1PaqhzJb5oNqPLXdYLYOJT1M2YK3zAwEF9XkreJJC2Gh3JmWMj41ALW79CJ4oRKZUvA7HTVpX1-g2ZLzbpDJfMMAA0XOjfsESgPjepFIpXt6I0uCoxVj0AnDAxUS_QiOHvWPwsWNGZssTQq_xnPbbl1JxbZd3SWg_JgfHlUqU1-sWJdyRjQJeeS7edWIFRldiQKAacJdr7SEpGTZHQCxIzMpjkYcUpdThPGy0qPs4QC0L0tV52dPkomGEV-eni5DTAFObF8OFg1C_n4m-Q7KoGvwer9s5OzN0G-nCiJl6k675TfYo4UAOhVFDSlRfr627lmMbQ1FtvYBfg1AJ9Fqxl3a4kEjAiDyimvU3LR2BISFMKu8pWRRWEyOnqIU-rdpZTBD7-sZiuwIn3LO9-kjgZ_8bFKIXSTSWDXjfl2S5wXS93mmtCcJDZy7rjx_HWQYqSwsdazUhtOOQX3WedRTzmbE3pCjZArBpIsneVsThh4QixuOxs5GFnZL5B27aHpBFlOTfeNSU',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric-test.system.cf.hob.local'
    },
    production: false,
    customEndpoints: [
      { url: 'https://osb-log-metric-dashboard-backend-test.system.cf.hob.local', identifier: 'log-metric-backend' },
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
