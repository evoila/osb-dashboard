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
      "bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJjMDdhYTY2NTRiMGE0MDQ1YjBmMjA1MjM2YTgwODllYSIsInN1YiI6ImZkNGI2MDEwLTA1ZmMtNDQxZC1iNzMxLWRhN2JhMWEyMDViZiIsInNjb3BlIjpbInJvdXRpbmcucm91dGVyX2dyb3Vwcy5yZWFkIiwiY2xvdWRfY29udHJvbGxlci5yZWFkIiwicGFzc3dvcmQud3JpdGUiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIiwicm91dGluZy5yb3V0ZXJfZ3JvdXBzLndyaXRlIiwic2NpbS53cml0ZSIsInNjaW0ucmVhZCIsImNsb3VkX2NvbnRyb2xsZXIuYWRtaW4iLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJjZiIsImNpZCI6ImNmIiwiYXpwIjoiY2YiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJ1c2VyX2lkIjoiZmQ0YjYwMTAtMDVmYy00NDFkLWI3MzEtZGE3YmExYTIwNWJmIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWxAZXZvaWxhLmRlIiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiZTc0OTZhZSIsImlhdCI6MTYxNzE4MjU5OCwiZXhwIjoxNjE3MTgzMTk4LCJpc3MiOiJodHRwczovL3VhYS5zeXN0ZW0uY2YuaG9iLmxvY2FsL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbInNjaW0iLCJjbG91ZF9jb250cm9sbGVyIiwicGFzc3dvcmQiLCJjZiIsInVhYSIsIm9wZW5pZCIsInJvdXRpbmcucm91dGVyX2dyb3VwcyJdfQ.g9gi05wYdVkP71bepm5gIwwxapF4lwh-I5voXln9QwAx1jHBtpex0_kUaEsB9Vfds6TXDNnFLEO_XS43MK88STUpxnNqPI3DFqz2l82DT6HI0jUrG0_SVr756_AUVGhwiJSD7iw5kuW5-d_PVFUWHRV3cGdyMxH5BmhDNRk79CAXcbPl1ytp6-TAGpc2PHllAmPMh6LAvWYETZoK_d1aR3vbXh7tWSQOLfV34sz3YdLpLINPTO2B3l-8l6hhclILX5cduuvuQJtzG1EOKeyC8ib47cWSEg5dphCRzsBw-JaIh_8b7nvGE4VSwMKiTTZ49kDRfnFCL7akCzOB6klZeg",
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
