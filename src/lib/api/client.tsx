import axios from "axios";

const DEFAULT_API_CONFIG = {
  baseURL: "http://localhost:3000",
  mode: "cors",
  credentials: "include",
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    Accept: "application/json",
  },
};

const client = axios.create(DEFAULT_API_CONFIG);

export default client;
