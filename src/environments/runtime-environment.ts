import { ExtensionUrl, Server } from "../app/core/extension-url";


// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {
    serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJmOTY0YmZkMzQ2NzY0NDZkOGM3OWE3NDdhNDg1MTM3MSIsInN1YiI6IjY2NTFkOTgwLTYxOWYtNGY4NS04NGRjLTg5YzA4NTQ2NWMyNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI2NjUxZDk4MC02MTlmLTRmODUtODRkYy04OWMwODU0NjVjMjYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiYTFkNTYyN2ItYTgwNC00YjVjLTk0ZTYtMDA3OGQ0ZTQ1ODQ1IiwiZW1haWwiOiJqaGV5bEBldm9pbGEuZGUiLCJyZXZfc2lnIjoiMmJhNDY0OGEiLCJpYXQiOjE1NDEyNTIxMzMsImV4cCI6MTU0MTI1MjczMywiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.q-PeFzY4blQtt0EM_pjeXR3pF0b6Bocf6csCsWbrPt2FnkNZGiCgZEgYncDFP0J5nhleYnpHDDH115-VuLq-2CSE25_OAWC9RswpCCx7yvyXYsDtBo1Osi1mB5iOOpqPq4XgjJbEhG0eKbilP30XF6meeEoqUIyfuWQT744R0ZW877_p8Z2s49HAzs3fifsu91v4tSyCrJ2xneNcrEfJy8ytzqt3LYmf_76gUnTYK8nzZdSnOx1mBXtKG0xb5H5GI_A-WiAKUF0XP5NsMUdiJM70CwGAT3aJYSPUpzf0sYVKPw65lRAToTvV70iwnuZC0Ns_zfOoyNZOG7Z6CwwY0Q',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host',
    },
    customEndpoints: [
      {"url":"http:\/\/localhost:8090","identifier":"log-metric-backend"},
      {"url":"http:\/\/localhost:8081","identifier":"osb-backup-manager"}
    ],
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
