import axios from 'axios';
import Config from 'react-native-config';

const client = axios.create({
  baseURL: Config.BASE_URL,
  responseType: 'json',
  timeout: 15000,
});

const apiLogRequest = (axiosRequest: AxiosRequestConfig) => {
  if (console.group) {
    console.group(
      '%cAPI Request',
      'color:white;font-weight:bold;background:#0194ff;padding:2px 6px',
      axiosRequest.url,
    );
  }
  console.log('HTTP Method\t\t', axiosRequest.method);
  console.log('Endpoint\t\t', axiosRequest.url);
  if (axiosRequest.data) {
    console.log('Request Body\t', axiosRequest.data);
  }
  console.log('AXIOS Request\t', axiosRequest);
  // @ts-ignore
  if (console.groupEnd) {
    // @ts-ignore
    console.groupEnd();
  }
};

const apiLogResponse = (axiosResponse: AxiosResponse) => {
  if (console.group) {
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:green;padding:2px 6px',
      axiosResponse.config.url,
    );
  }
  console.log('HTTP Method\t\t', axiosResponse.config.method);
  console.log('Endpoint\t\t', axiosResponse.config.url);
  if (axiosResponse.config.data) {
    console.log('Request Body\t', axiosResponse.config.data);
  }
  if (axiosResponse.data) {
    console.log('Response Body\t', axiosResponse.data);
  }
  console.log('AXIOS Response\t', axiosResponse);
  if (console.groupEnd) {
    console.groupEnd();
  }
};

const apiLogError = (
  apiName: any,
  error: {
    config: {method: {toUpperCase: () => void}, url: any, data: any},
    data: any,
  },
) => {
  if (console.group) {
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:red;padding:2px 6px',
      apiName,
    );
  }
  console.log('HTTP Method\t\t', error.config.method.toUpperCase());
  console.log('Endpoint\t\t', error.config.url);
  error &&
    error.config.data &&
    console.log('Request Body\t', error.config.data);
  error && error.data && console.log('Response Body\t', error.data);
  console.log('AXIOS Error\t', error);
  if (console.groupEnd) {
    console.groupEnd();
  }
};

// Add a request interceptor
client.interceptors.request.use(request => {
  apiLogRequest(request);
  return request;
});

// Add a response interceptor
client.interceptors.response.use(
  response => {
    apiLogResponse(response);
    return response;
  },
  error => {
    if (error.response) {
      const apiName = error.config.url || 'UNKNOWN';
      apiLogError(apiName, error.response);
    } else {
      console.log('API Error', error.message);
    }
    throw error;
  },
);

export default client;
