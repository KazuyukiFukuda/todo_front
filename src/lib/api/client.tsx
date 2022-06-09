import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_API_CONFIG: AxiosRequestConfig = {
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    Accept: "application/json",
  },
};

const client = axios.create(DEFAULT_API_CONFIG);

export default client;
