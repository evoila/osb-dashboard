import { ExtensionUrl, Server } from "../app/core/extension-url";

// this var may be injected via index.html and server-side include
const injectedEnv = window["INJECTED_ENVIRONMENT"];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn(
    "DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?"
  );
  seedEnv = {
    serviceInstanceId: "719d4c18-33ef-4729-ab5f-8c16969c0ddc",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJhMjRjMWQ4NmYxZjQ0NzE5OThlMmUwYjU4MzdkNTU5ZiIsInN1YiI6IjdkMDU0MTRkLTdlOWQtNDQ3MS04MmVlLTkzOGYyZWU0N2U1NSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiN2QwNTQxNGQtN2U5ZC00NDcxLTgyZWUtOTM4ZjJlZTQ3ZTU1Iiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoidHF1YW5kdEBldm9pbGEuZGUiLCJlbWFpbCI6InRxdWFuZHRAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjM4Mjk0MzQ3LCJyZXZfc2lnIjoiMmMxY2UwNWYiLCJpYXQiOjE2MzgyOTQzNDgsImV4cCI6MTYzODMzNzU0OCwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvc2ItcG9zdGdyZXNxbC10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJvcGVuaWQiLCJjbG91ZF9jb250cm9sbGVyX3NlcnZpY2VfcGVybWlzc2lvbnMiXX0.geMLDFfKK9bv6ybfZyuV1HeY3BiFkdr0HTWlACf2b_4n_sbzjQHUZAFfnyTd25Z0pGKQCs4teojrTG91oAjiNlVH-aQc8zES1YLSgJzL_8E6r8YZHh-BckYRk-A66qAhK6UYpQzmR6_WHLonRZdGnPBwYek8mUaIOQqtkKkib32l47YcCFyVj5EAeD9aBYcOXovjYziJBTT3tgazAc14EZtL-0Nn-HnUaULJILe0f4hZdUCT7rk5efLacSvObhdiV_fIJb6IHSXmmf60HNqyOpcthlXeUtQBi-6yv2cwUzCIcEWhG7jXy8iW7URlGIeoSCV1VnlRVW-gxkrcpwjYPA",
    baseUrls: {
      serviceBrokerUrl: "https://osb-postgresql-test.system.cf.hob.local",
    },
    customEndpoints: [
      {
        identifier: "log-metric-backend",
        url: "http://localhost:8090"
      },
      {
        identifier: "osb-backup-manager",
        url: "https://osb-backup-manager-test.system.cf.hob.local"
      },
      {
        identifier: "osb-autoscaler-core",
        url: "https://osb-autoscaler-core.cf.evoila.io"
      },
      {
        identifier: "osb-backup-notification-service",
        url: "https://osb-backup-notification-service-test.system.cf.hob.local"
      }
    ],
    ui: {
      title: "Service Broker Panel",
      logoSrc: "./assets/core/sb-white.svg",
    },
  } as Environment;
} else {
  seedEnv = {
    serviceInstanceId: "/*[[${serviceInstanceId}]]*/",
    token: "/*[[${token}]]*/",
    baseUrls: {
      serviceBrokerUrl: "/*[[${endpointUrl}]]*/",
    },
    ui: {
      title: "Service Broker Panel",
      logoSrc: "./assets/core/sb-white.svg",
    },
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
}

// we use quoutes here because that makes it easier to copy config to nginx.conf or cf manifest files
// tslint:disable:quotemark

// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
