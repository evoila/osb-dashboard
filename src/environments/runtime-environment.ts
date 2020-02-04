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
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiIyMTgzMjY5N2M3YTM0ZTA2OGNhMzQxNTU1YWUyMzM5MiIsInN1YiI6ImFjNTcxOGQ4LThlZjEtNDc1ZS1hZWYzLTUyNjk5YzlmNjAwZSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiYWM1NzE4ZDgtOGVmMS00NzVlLWFlZjMtNTI2OTljOWY2MDBlIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlciIsImVtYWlsIjoibW1haGxlckBldm9pbGEuZGUiLCJhdXRoX3RpbWUiOjE1ODA4MTExMzksInJldl9zaWciOiI0ZDc3MzdhZiIsImlhdCI6MTU4MDgxMTE0MCwiZXhwIjoxNTgwODU0MzQwLCJpc3MiOiJodHRwczovL3VhYS5zeXN0ZW0uY2YuaG9iLmxvY2FsL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsIm9zYi1sb2ctbWV0cmljLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucyJdfQ.EIp8O4_ndYQRqo0n7woMkGuR-EMmA15LY3-MfhYAseOwcZ7DZGaTra7hYvmTO43hfMw4K9ITPWSEyv_2SIS1Zbscqv7-Ow9sWNK55AwQrJSm2iYZU0WHXS-_w3DFRwWd9Ucd7lPDEW6Dkq_OqhHT1mwh_443XJoigrVfGTiEZUBqIktyi_gMaFrumaF9UN08l7qHl9W1uL_iz_MFiPJsz8hx5JQibrSfD3aT1TActe-yF0s9v3aJb5Cx4Un0Xb1Uj0918bvVLW4tDWbhY9qIYllEiccyl7TWRJpn7HUaHOkO0BHGx8dAHnoMsvt7Axo-g_XI6opDrKE0PIF6fnMufw',

    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric-test.system.cf.hob.local'
    },
    production: false,
    customEndpoints: [
      { url: 'https://osb-log-metric-dashboard-backend-test.system.cf.hob.local', identifier: 'log-metric-backend' },
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
