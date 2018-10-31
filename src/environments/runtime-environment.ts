import { ExtensionUrl, Server } from "../app/core/extension-url";


// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {

    serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
    token: 'Bearer  eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJmMjYwOWMxZGU5YWI0ZTQwYmU2Yzc1OTk1OTY0YzlmOSIsInN1YiI6IjY2NTFkOTgwLTYxOWYtNGY4NS04NGRjLTg5YzA4NTQ2NWMyNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI2NjUxZDk4MC02MTlmLTRmODUtODRkYy04OWMwODU0NjVjMjYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiYTFkNTYyN2ItYTgwNC00YjVjLTk0ZTYtMDA3OGQ0ZTQ1ODQ1IiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiMmJhNDY0OGEiLCJpYXQiOjE1NDA5Nzk5NjQsImV4cCI6MTU0MDk4MDU2NCwiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.JPq6hjP2PcT27R_l83ZNYsqxTvf-d6sF3abSnn1ew5I_lbV_yMfpnnH_N8WD39j4kuij2AxQ-5ICtuzYem5isz_UxxoO1PjbPUgaUAZ6zFe_c_nP3EeT3duGnFQQI30Z9fUARxAOAjeI63CynOGOcdS6NWOyo_TrYSo7iRbSdHxu2QKyTMGiMJD3VvPFr0I1E8mV1keFD6kH-7zNXsRz1KSV5vst_zCizN_N22C-GrkZG6REIeeuMbHTtNFoN6mkhVN7qvHUXv2RazFFk41SQBuFX5LVIey2W18NrdCkqzC8TRCe5KnsJWSCQ-ycKIdsXIv5YDIKHEyjn5MpulHuiw',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host',
    },
    customEndpoints: [{"url":"https:\/\/osb-log-metric-dashboard-backend.cf.dev.eu-de-central.msh.host","description":"DashboardBackendURL"}],
    ui: {
      title: 'Service Broker Panel',
      logoSrc: './assets/core/sb-white.svg'
    }
  } as Environment;
} else {

  seedEnv = {

    serviceInstanceId: '/*[[${serviceInstanceId}]]*/',


    token: '/*[[${token}]]*/',

    baseUrls: {
      serviceBrokerUrl: '/*[[${endpointUrl}]]*/',
    },
    ui: {
      title: 'Service Broker Panel',
      logoSrc: './assets/core/sb-white.svg'
    }
  } as Environment;

}

export interface Environment {
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
};

// we use quoutes here because that makes it easier to copy config to nginx.conf or cf manifest files
// tslint:disable:quotemark


// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
