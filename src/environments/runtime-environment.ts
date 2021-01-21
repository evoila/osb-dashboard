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
      "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdWFhLmNmLmV2b2lsYS5pby90b2tlbl9rZXlzIiwia2lkIjoia2V5LTEiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJmMDY3ZjYzZTY4ZmE0OTViOTAyZTAwODFjZjIzNTllZSIsInN1YiI6ImZhNzhhNTQ2LTJkMGMtNGEyOC1hZDVmLWZiOGJkYjlmZGZmMSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXJfc2VydmljZV9wZXJtaXNzaW9ucy5yZWFkIiwib3BlbmlkIl0sImNsaWVudF9pZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImNpZCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImF6cCI6Im9zYi1wb3N0Z3Jlc3FsLTEyLmNmLmV2b2lsYS5pbyIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiZmE3OGE1NDYtMmQwYy00YTI4LWFkNWYtZmI4YmRiOWZkZmYxIiwib3JpZ2luIjoiRXZvaWxhU1NPIiwidXNlcl9uYW1lIjoiamhleWxAZXZvaWxhLmRlIiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJhdXRoX3RpbWUiOjE2MTEyMzcxOTksInJldl9zaWciOiI5YjcwNDYyZiIsImlhdCI6MTYxMTIzNzIwMCwiZXhwIjoxNjExMjgwNDAwLCJpc3MiOiJodHRwczovL3VhYS5jZi5ldm9pbGEuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsib3BlbmlkIiwib3NiLXBvc3RncmVzcWwtMTIuY2YuZXZvaWxhLmlvIiwiY2xvdWRfY29udHJvbGxlcl9zZXJ2aWNlX3Blcm1pc3Npb25zIl19.XhSzpIFNZ14g68MLvZn7Yc2aTS6VzR5pPbp8QJkLErQ8FkDFOytf0I8vhrqtnmIN_A8WUnZbsVQ5gziTuCy05yintdkeD7O54W0We0PKZdaGvKVrrq7p7q1mKZTvKaLpowNpi-uxvYS640mwzaAPRT9RFkKzaCwCiEE1z-XEEn9y8EmlCpbpyiJWvtmxJ0I7t0OWa5WvQisoFXMbAo2wz20mmged2tZWKOCFcRhsZiXKztek5Hxcx6PmQtFC-3k-0bx-ou1vDsu-mdrIbRQiksT9HFPrZr4AMe8sLjVGCJwL1MrzmDPRmWrDX-YeidsRJ6HKZz8B7AmcDysmJIMr8g",
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
