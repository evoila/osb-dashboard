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
    serviceInstanceId: "6b251574-2f78-4ba1-a183-2525e08558f0",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiIxZTFhYjVjMWMzNmI0NjkxYWNhMzJmZmM4YzYyNWQ4MyIsInN1YiI6IjQ4OTljYzg5LTNlYTAtNGQ3Mi05MDQ4LWY1M2Y4N2M4YjMyMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1tb25nb2RiLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiNDg5OWNjODktM2VhMC00ZDcyLTkwNDgtZjUzZjg3YzhiMzIxIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlckBldm9pbGEuZGUiLCJlbWFpbCI6Im1tYWhsZXJAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjE3MDA0NDk3LCJyZXZfc2lnIjoiOTRmMmE4YTciLCJpYXQiOjE2MTcwMDQ0OTgsImV4cCI6MTYxNzA0NzY5OCwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvcGVuaWQiLCJvc2ItbW9uZ29kYi10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJjbG91ZF9jb250cm9sbGVyX3NlcnZpY2VfcGVybWlzc2lvbnMiXX0.XHU3hyE2HYjfR7x2kcYfN2YBYrMwi0_VWNozEsisKfR9jxSa4HsbbBY8HGFutFyooHVNhNLRqU63og1hdoEO1qrKpldGfv1A4eLvBcZ3J_u0zjC_1hME9-NbKajZCbTserEkIbu9yyRb0tMivNoQSXWy281atq4D64hRbFWQmkMoOgGQ5B1Phh5krZLlEGC3avJJO12Y1-PGubyfq6hDVG6VWlQx5IdNDTQAT1i71rwr4JVWEDQPCXB3eFR4wGqQt7e7KH6rCLiHW8hXKDylq0V27oDOK0xVmOYjgKdPubDb8OJP04ry4EUPlHWaUHqZXvevQ6zqhmV-b1m83mkVug",
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
