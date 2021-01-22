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
    serviceInstanceId: "f0c34eaf-2171-4334-85a6-e88acf4820f8",
    token:
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLmNmLmV2b2lsYS5pby90b2tlbl9rZXlzIiwia2lkIjoia2V5LTEiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJmMzI0YjM5ZjE3Zjc0MWQyYWEzOTkxMTg0ZTM5NjYwZCIsInN1YiI6IjQ5YTZjNmQyLWEzOTEtNDQzMS04YjQwLTE2YzViZjc3NzgyYyIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiNDlhNmM2ZDItYTM5MS00NDMxLThiNDAtMTZjNWJmNzc3ODJjIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlckBldm9pbGEuZGUiLCJlbWFpbCI6Im1tYWhsZXJAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjExMzA1MDk0LCJyZXZfc2lnIjoiYTM3ZTViMTUiLCJpYXQiOjE2MTEzMDUxNjMsImV4cCI6MTYxMTM0ODM2MywiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZXZvaWxhLmlvL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbIm9wZW5pZCIsIm9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucyJdfQ.XaFvM1AHI7XnsUQuogkTzXH2ClxC3hwEbsXmzgwP5OI5QhJWdfozJ5eNMZ-H51n_HJOnlulYuBmoxBzXvEvxoLRsDhiTuEeemCebZhhyLJmsAleZ2kQBeH3uoA23j1g-2fIn8t7TAU1tN0rXRnJZjha_1faIkQEs38lS7ropByzVek5pLUqVxTD5OqBjjW9DxN3vvavPQjbuauE6Bs9L3vkNXOmgmvR_qXjxTbbyU-_jxjGYcuGxwxc7N4RYXp4CPrYkWHeF0j3n8YzyOxyx7EJSozonOYHeVMOBuz5Sbl7L8rGxNtYXev4wsix2D9Tq53bJG22MQoqyIXU39_4fLw",
    baseUrls: {
      serviceBrokerUrl: "https://osb-postgresql-12.cf.evoila.io",
    },
    customEndpoints: [
      { url: "http://localhost:8090", identifier: "log-metric-backend" },
      {
        url: "https://osb-backup-manager.cf.evoila.io",
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
