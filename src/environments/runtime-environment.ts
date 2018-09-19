// this var may be injected via index.html and server-side include
const injectedEnv = window['INJECTED_ENVIRONMENT'];
if (!injectedEnv) {
  // tslint:disable-next-line:no-console
  console.warn('DASHBOARD DEFAULT DEVELOPMENT ENV ACTIVE - DID YOU FORGET TO INJECT A RUNTIME ENV?');
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
const seedEnv = {
//serviceInstanceId: '/*[[${serviceInstanceId}]]*/',
serviceInstanceId: '7d20760b-15ac-43ba-86e5-56c60ed2e010',
token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI4MDU1YTQxNDQxYWU0NDNiOTg4ZTZkMzY2YmIxMTdkZiIsInN1YiI6Ijc3ZGNiOTNjLTNlY2ItNGY5Mi1hYzE1LTQ5ZmQwN2QwNmRhNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3N2RjYjkzYy0zZWNiLTRmOTItYWMxNS00OWZkMDdkMDZkYTYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiZTUwZWJjN2UtYzBkOC00Yjc1LThlY2QtMzgwMTU0YWVlMGJiIiwiZW1haWwiOiJqaGV5bEBtZXNoY2xvdWQuaW8iLCJyZXZfc2lnIjoiNTEwYTI4ZjQiLCJpYXQiOjE1MzczODQ2MTMsImV4cCI6MTUzNzM4NTIxMywiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.du6HQgVluKBdUyHP-_I-UyWXiA3lEFHdvLUX4lFfHlaWDGu_ojltjgWOyTKw5hAzIEYNZiUEA7JSmrVVOsMS9DgJdLtn0hoq_bgnJ65Bwh3zu0tHsRdIE0fEdAWYBhml6gsvnstqInXq4blYkow0knQeD9k3IdnPK_l9jU9b0VHjHAEPTgpr6RO3KEUzUOgYg90sbh9NEgA2iazY_yO9sf1rlw_jAy9ZVs0bCqDG0H0r1qY8I34dSzUgi9kbRDpJY37mBEn9FvZ0yVRPpV5G_Utay8-XsBgcYH5jfVLak77ZXAF01EDfA1Ibv_cU9H6SMrGRBK7Ay2MgIFcbtYl4zw',

baseUrls: {
serviceBrokerUrl: 'https://osb-log-metric.cf.dev.eu-de-central.msh.host/',
},
  ui: {
    title: "Service Broker Panel",
    logoSrc: "./assets/core/sb-white.svg"
  }
};


// overwrite default env with injected vars
export const environment: Environment = Object.assign({}, seedEnv, injectedEnv);
