import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { ErrorResponse } from "../type";

/*  */ export const applyInterceptors = (
  instance: AxiosInstance
): AxiosInstance => {
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      if (res.data && res.data.data) {
        res.data = res.data.data;
      }
      return res;
    },

    (error: AxiosError<ErrorResponse>) => {
      const status = error?.response?.status || null;

      if (status === 401) {
        //導頁到登入
        //  window.location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
  );
  return instance;
};
