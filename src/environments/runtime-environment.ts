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
    serviceInstanceId: "c75c20cf-dd16-46cf-9ed7-e21b8f5e88e1",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI0YzQyZTVkNTE3NzQ0ZTJmOGQzODU4NjMyZDQ0M2NmNSIsInN1YiI6IjQ4OTljYzg5LTNlYTAtNGQ3Mi05MDQ4LWY1M2Y4N2M4YjMyMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1rYWZrYS10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJjaWQiOiJvc2Ita2Fma2EtdGVzdC5zeXN0ZW0uY2YuaG9iLmxvY2FsIiwiYXpwIjoib3NiLWthZmthLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiNDg5OWNjODktM2VhMC00ZDcyLTkwNDgtZjUzZjg3YzhiMzIxIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlckBldm9pbGEuZGUiLCJlbWFpbCI6Im1tYWhsZXJAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjI0NTI3MTg5LCJyZXZfc2lnIjoiMThiNDAxODUiLCJpYXQiOjE2MjQ1MjcxODksImV4cCI6MTYyNDU3MDM4OSwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvcGVuaWQiLCJvc2Ita2Fma2EtdGVzdC5zeXN0ZW0uY2YuaG9iLmxvY2FsIiwiY2xvdWRfY29udHJvbGxlcl9zZXJ2aWNlX3Blcm1pc3Npb25zIl19.hi1PhV-o78oSxz9uruVtGmpbLnT6XkJBinSGLAAe5CuKa5T1V5hcvRw7KG67lKzvf4gO6kr0dkEKMoO8MYUuDtxIuS_Yporkl_o-wCusA_3sVx0HKLsYJib6GVs0Hy3dpYX9wGjyAUL-lkyw_yY7uwCKpSZQbknDwJDknO4r1DAJRfmaw43nqMSlnr7k5Uo3bEHAaiRLZjuYeOx0yDJudVLw5ITbme2fjveRILG03XhN7ZG15gQRjXgBso-9hUHM26j8cLMJiX2a6zhWDWqFnReMqACyXbUj7SOE6WkzMX8_eZDHP0iaYhOmTvernf0jThbJBATN1cl-gLKaiN3jFA",
    baseUrls: {
      serviceBrokerUrl: "https://osb-kafka-test.system.cf.hob.local",
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
