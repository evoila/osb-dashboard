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
    serviceInstanceId: "7e428bc7-7299-4560-878d-938360fb7c95",
    token:
<<<<<<< HEAD
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLnN5c3RlbS5jZi5ob2IubG9jYWwvdG9rZW5fa2V5cyIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJiNTQ2MmIxNjhiYzE0ZjQwODUwMDI0NmMxN2ZkYzU1MCIsInN1YiI6IjQ4OTljYzg5LTNlYTAtNGQ3Mi05MDQ4LWY1M2Y4N2M4YjMyMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLXRlc3Quc3lzdGVtLmNmLmhvYi5sb2NhbCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiNDg5OWNjODktM2VhMC00ZDcyLTkwNDgtZjUzZjg3YzhiMzIxIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoibW1haGxlckBldm9pbGEuZGUiLCJlbWFpbCI6Im1tYWhsZXJAZXZvaWxhLmRlIiwiYXV0aF90aW1lIjoxNjIxMjUyMzQ2LCJyZXZfc2lnIjoiYThjYTIwOWUiLCJpYXQiOjE2MjEyNTIzNTAsImV4cCI6MTYyMTI5NTU1MCwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzdGVtLmNmLmhvYi5sb2NhbC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJvc2ItcG9zdGdyZXNxbC10ZXN0LnN5c3RlbS5jZi5ob2IubG9jYWwiLCJvcGVuaWQiLCJjbG91ZF9jb250cm9sbGVyX3NlcnZpY2VfcGVybWlzc2lvbnMiXX0.fVgBZVICurhSVlV2c7_JkB6Da12Liy3WHU1OQ7LBJQfMmzjhBmHPA2_62ogL05PDM6PbxUbRptnR16SvLbMeAwperG4pqWWvNw1kI6ns352gaCDHsQqkzLWBxu3SLpKyxnucQ3DoC1uV-7AF_BpGDyR4c7fMzNGdcNFlXY8PYdk6F0hElPj94VIjXTQwDq28IwIIbYfReXS4YbNZUKosg40cklT3eokF_3KNm1EX-YPF5BI6DYNGCkEOZ2H9ED_5I-0jWoD089eNQb2eh8DuxkhUREq_SUuX2Wm7G8EuLpscRr8UXW7__lTeksBhDlt4BLDUWAttQXBuK84wZDAhng",
=======
      "Bearer NO BEARER IN HEREA",
>>>>>>> feat/configurationsettingserrorhint
    baseUrls: {
      serviceBrokerUrl: "https://osb-postgresql-test.system.cf.hob.local",
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
