/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { getLocalStorageItem } from "./LocalStorage";
import type { AccessToken } from "../hooks/services/use401";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",

  }
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig  => {
  try {
    const tokenObject = getLocalStorageItem<AccessToken>('access_token');
    if(tokenObject?.refreshToken){
      config.headers.Authorization = `Bearer ${tokenObject.refreshToken}`;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
}, (error: any) => Promise.reject(error));

export default axiosInstance;