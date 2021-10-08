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
    serviceInstanceId: "17db6816-0abc-4f0d-af4f-ef3842658528",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJiNWY3MTg1ZTgyODQ0MDY4YWFlMDFhY2FlODJlY2Q4MiIsInN1YiI6IjdkMDU0MTRkLTdlOWQtNDQ3MS04MmVlLTkzOGYyZWU0N2U1NSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiN2QwNTQxNGQtN2U5ZC00NDcxLTgyZWUtOTM4ZjJlZTQ3ZTU1Iiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoidHF1YW5kdEBldm9pbGEuZGUiLCJlbWFpbCI6InRxdWFuZHRAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjMzNjk2Mjg2LCJyZXZfc2lnIjoiNzdiY2FiMWYiLCJpYXQiOjE2MzM2OTYzNjcsImV4cCI6MTYzMzczOTU2NywiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvcGVuaWQiLCJvc2ItbW9uZ29kYi10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJjbG91ZF9jb250cm9sbGVyX3NlcnZpY2VfcGVybWlzc2lvbnMiXX0.M2eg2RAJesqa4oJL7Ce_H_TZOTCVrhKin6F0s5LPcZJpUypnDlgwDc-r6C6jUc8TdJFe5oSpgVxQcw9AIwx71dGEAQO_ddwYinXtuiZmizGuopRIBItXTYMibzMhbk1wbW-BPK9AsNrp8WB_bahxVhva-69nORAgVyiMEub-C579EJt420IEZd7bILxdSZz4fDMOmx9ulxFamLCYwS87jpHdIWImNerZV9i84H8T-GaHD0HJcmdktClvLWboxMWpYfqwGJsPEDM3H0d9-99IshoFbBpEqQ6cLu_iNn1T5HoFVytL1aTA6E1CBmarQCd6iHelO4ktO5LRlZj_ASuKlA",
    baseUrls: {
      serviceBrokerUrl: "https://osb-mongodb-test.system.cf.hob.local",
    },
    customEndpoints: [
      { url: "http://localhost:8090", identifier: "log-metric-backend" },
      {
        url: "https://osb-backup-manager-test.system.cf.hob.local",
        identifier: "osb-backup-manager",
      },
      { 
        url: "https://osb-autoscaler-core.cf.evoila.io",
        identifier: "osb-autoscaler-core",
      },
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
