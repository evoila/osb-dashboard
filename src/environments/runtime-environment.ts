// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
let seedEnv: Environment;

if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
  seedEnv = {

    serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
    token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI4ZjQxOTdjNjU1ZTE0ODUxODM5MWRkOTdlMzVhOTgzMyIsInN1YiI6Ijc3ZGNiOTNjLTNlY2ItNGY5Mi1hYzE1LTQ5ZmQwN2QwNmRhNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3N2RjYjkzYy0zZWNiLTRmOTItYWMxNS00OWZkMDdkMDZkYTYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiZTUwZWJjN2UtYzBkOC00Yjc1LThlY2QtMzgwMTU0YWVlMGJiIiwiZW1haWwiOiJqaGV5bEBtZXNoY2xvdWQuaW8iLCJyZXZfc2lnIjoiNTEwYTI4ZjQiLCJpYXQiOjE1Mzc1MzU0ODIsImV4cCI6MTUzNzUzNjA4MiwiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.fqpq9wa-IB_XjopHhPlledbVzXuznkOhYMR7ZQ9N76Flxgd4ZWIhZT3RJCe96QOxfDLGKUfDhJNha4twbhLdtBNFJlKWiK_Zb0N9J3J4wQrzNep0xmb0cMrgukFTEj0FrdtOVKEKrJPww9FUEqLIyKyp-PihrtUZIrFAPFJjjO1YPquozMMilHrViIHq41nbHlzVDP5GT52QgFdmQiP23-RzwchV7TiruE2xLztE7T38v5tZs_oJtSNk9mJ5ujm5DyySd-Zwqf9RnMFuemSWARGUNn3IrpfbJ9lTSA41WKNVl6lY3e9N2Jz2OI8LOCLPw3UN5EAZfwlDo6iDW1U2Kw',
    baseUrls: {
      serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host',
    },
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
  production: boolean;
  baseUrls: {
    serviceBrokerUrl: string;
  };
  ui: {
    title: string;
    logoSrc: string;
  };
};

// we use quoutes here because that makes it easier to copy config to nginx.conf or cf manifest files
// tslint:disable:quotemark


// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
