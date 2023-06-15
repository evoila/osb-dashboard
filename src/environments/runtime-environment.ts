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
    serviceInstanceId: "be4258a6-1c10-4bae-b30f-b5fef7613d0c",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJkZTNhODQwN2FkNzQ0YmYyOTkyMTMzNTAzY2ZlNzM5YyIsInN1YiI6IjdkMDU0MTRkLTdlOWQtNDQ3MS04MmVlLTkzOGYyZWU0N2U1NSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiN2QwNTQxNGQtN2U5ZC00NDcxLTgyZWUtOTM4ZjJlZTQ3ZTU1Iiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoidHF1YW5kdEBldm9pbGEuZGUiLCJlbWFpbCI6InRxdWFuZHRAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjQ0NTkxOTg2LCJyZXZfc2lnIjoiMmMxY2UwNWYiLCJpYXQiOjE2NDQ1OTI1NTUsImV4cCI6MTY0NDYzNTc1NSwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvc2ItcG9zdGdyZXNxbC10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJvcGVuaWQiLCJjbG91ZF9jb250cm9sbGVyX3NlcnZpY2VfcGVybWlzc2lvbnMiXX0.Vcj5foWDqkPz6mWZQQsH7C2sSvBV3ShuOQEZjUya2m2cEjs-Xr6y3JuhAkc04eFuR3q2j_OqRl5qQ65tGkA-QMpyhOu1ZG4U_6YRGcwJFRomyijUmj5MlaBe5iFBuHHlOJJuQ388mR8C2UjMxP49kmXL-pP3RIAR2pb6Xnw095P-dpvr0yEVEfvUrD17VLhe4vZKnS6Rc2uk6ZDZIIn9TEYCDSvGCzks8KJNIhUUdrWdwbgMvXeHPWVc-jVP4HoNaqa-pCRD8T_b-HrKcbapk0s2noJIlMymQFxtuFu-Kx9E2RnTbwZb0BOtRF1BUVVC6CxuYJ3M2J8U7MwhutXGww",
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
