import { ExtensionUrl, Server } from "../app/core/extension-url";


// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {

    serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiIzMjI3YmFhYTI0ZWQ0NjllYTY0YmFkZjliMzg4NWQ1YyIsInN1YiI6Ijc3ZGNiOTNjLTNlY2ItNGY5Mi1hYzE1LTQ5ZmQwN2QwNmRhNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3N2RjYjkzYy0zZWNiLTRmOTItYWMxNS00OWZkMDdkMDZkYTYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiZTUwZWJjN2UtYzBkOC00Yjc1LThlY2QtMzgwMTU0YWVlMGJiIiwiZW1haWwiOiJqaGV5bEBtZXNoY2xvdWQuaW8iLCJyZXZfc2lnIjoiNTEwYTI4ZjQiLCJpYXQiOjE1Mzk4NzA1NDksImV4cCI6MTUzOTg3MTE0OSwiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.bfTo__PwjGLD2jwZdh6o1b1tHrTRmZU7nWAHYAU1UICuR-f6-CDGis_bmFJbO5YLWDbIrxyV4cHcXrzNkyBc3l_VAiIwkNA-KHaXL1X6ruYLgYIS1awtw-FIsp2UDgMI7TxbtwChTSSH0ZHn0WSz0Q64PPBz6WpKn-3dzY3NR_gi7tPdWzEdxfVh-Z_PtD8A6JcOn-mzRvwB2D86xXEAGmQWWEfxC6nR6tHqEXXLCJiohsNntq5r6dSJSd8hefq-KwoyqjPPvkNt0XQuxoWjdDNM47L-3P_QQli7XENufvtG3w8gT4wOceGTV5xkrGUdNGatcXJ4TVg5eqqWKhx67w',
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
