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
    serviceInstanceId: "4f39eaf6-ab34-4577-9b48-6b7e5ab3e8de",
    token:
      "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJlMjQ0MGI5OTk0Zjc0NGZkOTY5OGIyNzA1NmFjM2RhZSIsInN1YiI6ImZkNGI2MDEwLTA1ZmMtNDQxZC1iNzMxLWRhN2JhMWEyMDViZiIsInNjb3BlIjpbInJvdXRpbmcucm91dGVyX2dyb3Vwcy5yZWFkIiwiY2xvdWRfY29udHJvbGxlci5yZWFkIiwicGFzc3dvcmQud3JpdGUiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIiwicm91dGluZy5yb3V0ZXJfZ3JvdXBzLndyaXRlIiwic2NpbS53cml0ZSIsInNjaW0ucmVhZCIsImNsb3VkX2NvbnRyb2xsZXIuYWRtaW4iLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJjZiIsImNpZCI6ImNmIiwiYXpwIjoiY2YiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJ1c2VyX2lkIjoiZmQ0YjYwMTAtMDVmYy00NDFkLWI3MzEtZGE3YmExYTIwNWJmIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWxAZXZvaWxhLmRlIiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiZTc0OTZhZSIsImlhdCI6MTYxNzE4MDk2MSwiZXhwIjoxNjE3MTgxNTYxLCJpc3MiOiJodHRwczovL3VhYS5zeXN0ZW0uY2YuaG9iLmxvY2FsL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbInNjaW0iLCJjbG91ZF9jb250cm9sbGVyIiwicGFzc3dvcmQiLCJjZiIsInVhYSIsIm9wZW5pZCIsInJvdXRpbmcucm91dGVyX2dyb3VwcyJdfQ.aasbpCjd42Su3IWGTnvdAyy9_fUS3IkWcQEPbX89-sqFmM-4yVOPbnZlNg2dWHP8dv3DnE_GFmS0DLmwgSeW8hOev5WNKXJyT1vPcvgO6h4275hla0-T-RBLXp5BHWAcD9ybrWXsBKBAEfhux0dAqfHgbKaYQWih-QhteicgS8nQdf4njJftgPorLC3nH-rm93BEuqGcD_6pRUtmRurQA2wV5NZuuVPuRQYevATVzzB4MPX9ujFwx7f0c0SPHO4SlZTVsNXoC_948mvw5f8K6LBAn-Vv5uSsP74kLlwla9gBSV2xWahRMqeNhDJWmDjIOuQpH9WdmQee0Ng456wbXA",
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
