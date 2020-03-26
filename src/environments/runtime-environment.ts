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
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI4ZTU1NTk3ZmFkNTk0NjExYjhmN2I4YzQ2MGJlMDI0MyIsInN1YiI6ImFjNTcxOGQ4LThlZjEtNDc1ZS1hZWYzLTUyNjk5YzlmNjAwZSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiYWM1NzE4ZDgtOGVmMS00NzVlLWFlZjMtNTI2OTljOWY2MDBlIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlciIsImVtYWlsIjoibW1haGxlckBldm9pbGEuZGUiLCJhdXRoX3RpbWUiOjE1ODUyMTg0MTYsInJldl9zaWciOiI0ZDc3MzdhZiIsImlhdCI6MTU4NTIxODQxNywiZXhwIjoxNTg1MjYxNjE3LCJpc3MiOiJodHRwczovL3VhYS5zeXN0ZW0uY2YuaG9iLmxvY2FsL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsIm9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucyJdfQ.nkICZtYaFzBA-wOZeN2aci0xuAfqLc7xCzKo29AVqzEaVVQFGuM0P0XYjl1M5sNZ1vH7YcJHY36nxQ8TUBE5R2yZoc2R7S97U_CfODGC9VCqGh42LC2beWIRrtvNVfIXHJ-Xy3ieUmZOBB1MfVbM6oGZbijNRovMcYfFUxTjewU0zQpyZLGYSrfzFzyXqvFngpfCoUQXhQS2SLHNdLO4ZBY6J4F1fRqlmjCv-G2-IOpXC986CN0Y4tejioR7MKhExvWC1ogHe8xjyktd2dX_jo49DJziYq1x2r5sq_zqmRVJJNvyIv-Qqpxhxfjlsw9MDkhyTkTt-63yOYUXpSGHSQ',

    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric-test.system.cf.hob.local'
    },
    production: false,
    customEndpoints: [
      //{ url: 'https://osb-log-metric-dashboard-backend-test.system.cf.hob.local', identifier: 'log-metric-backend' },
      { url: 'https://log-metric-backend-feature.system.cf.hob.local', identifier: 'log-metric-backend' },
      //{ url: 'http://localhost:8080', identifier: 'log-metric-backend' },
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
