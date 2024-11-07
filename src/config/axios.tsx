import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../constants/index";
import Cookies from "js-cookie";

const config: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30000,
};

const api = axios.create(config);

const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get("token");
  if (token) {
    (config.headers as any).set('Authorization', `Bearer ${token}`);
  }
  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response && error.response.status === 401) {
    window.location.href = "/sign-in";
  }
  return Promise.reject(error);
};

api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use(handleResponse, handleResponseError);

export default api;
