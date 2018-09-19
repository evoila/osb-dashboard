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
token: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJiZjQ0YTVhYTZlNjI0YmQyYjY2M2IzMGI0OTA5ZTE5MSIsInN1YiI6Ijc3ZGNiOTNjLTNlY2ItNGY5Mi1hYzE1LTQ5ZmQwN2QwNmRhNiIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9wZW5pZCIsInVhYS51c2VyIl0sImNsaWVudF9pZCI6ImNmIiwiY2lkIjoiY2YiLCJhenAiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiI3N2RjYjkzYy0zZWNiLTRmOTItYWMxNS00OWZkMDdkMDZkYTYiLCJvcmlnaW4iOiJtZXNoZmVkIiwidXNlcl9uYW1lIjoiZTUwZWJjN2UtYzBkOC00Yjc1LThlY2QtMzgwMTU0YWVlMGJiIiwiZW1haWwiOiJqaGV5bEBtZXNoY2xvdWQuaW8iLCJyZXZfc2lnIjoiNTEwYTI4ZjQiLCJpYXQiOjE1MzczNjI0NDQsImV4cCI6MTUzNzM2MzA0NCwiaXNzIjoiaHR0cHM6Ly91YWEuY2YuZGV2LmV1LWRlLWNlbnRyYWwubXNoLmhvc3Qvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2xvdWRfY29udHJvbGxlciIsInBhc3N3b3JkIiwiY2YiLCJ1YWEiLCJvcGVuaWQiXX0.O-bleeBl5ht420uJ4gjF55evBjazKsxRtDOsII2_h_GKBBGPw9uc6S5cVsRNZp41pNoRIcOCbIZj-iF9tsl7WqkJR839gOdC1PDbj_UDRjCOp3JNtf6DJF9_2zEc1-tpW1hVaPGqFhkI7dwMXMqAZYY1GMM0BOnWZL1pM6ywM2V4cHPvfTlK3Ks0fMJ_IlQHx3441xMVEEL47_ShE70ZKis4fDzqJb7dpRR8qgd9LngeRwfZl_TqbP5whrQk0UsWzxuBSksvxngTI2qLdaY4eHB7DrQ80Y-TvNe4Azcssx5m6K1nzAh70Zf3SB_ps3sHvt-u7sKyXPQyr9ynSgGZ8g',

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
