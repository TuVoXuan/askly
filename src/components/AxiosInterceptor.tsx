import { useLayoutEffect } from "react";
import use401 from "../hooks/services/use401";
import axiosInstance from "../utils/Axios";
import type { AxiosError, AxiosResponse } from "axios";
import { Outlet } from "react-router-dom";

const AxiosInterceptor = () => {
  const { refreshTokenHandler } = use401();

  useLayoutEffect(() => {
    const interceptorResponse = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
          refreshTokenHandler();
          return Promise.reject(error);
        }

        if (status === 403) {
          // show toast
          return Promise.reject(error);
        }

        if (status === 500) {
          // show toast
          return Promise.reject(error);
        }

        if (status === 503) {
          //show toast
          return Promise.reject(error);
        }

        if (status === 504) {
          //show toast
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
    return () => axiosInstance.interceptors.request.eject(interceptorResponse);
  }, [refreshTokenHandler]);

  return <Outlet />;
};

export default AxiosInterceptor;
