import { AxiosResponse } from "axios";

import AxiosUserClient from "@/api/axios/axiosUserClient";

import { MsgRecord } from "@/app/dashboard/revenue-history/data";

export const RevenueHistoryApi = {
  getRevenueHistory: async (
    date: string
  ): Promise<AxiosResponse<MsgRecord[]>> => {
    const response = await AxiosUserClient.get(
      `/lineHook/sendMsg?date=${date}`
    );

    console.log(response);
    return response;
  },
  /*  sendMsg: async (
    user: RegisterUserReqSchemaType
  ): Promise<AxiosResponse<SignUpResponse>> => {
    const response = await AxiosUserClient.post("/users/signup", user);
    console.log(response);
    return response;
  },
  sendMsgAll: async (
    storeUser: LoginRequestSchemaType
  ): Promise<AxiosResponse<StoreLoginResponse>> => {
    const response = await AxiosUserClient.post<LoginResponse>(
      "/store/login",
      storeUser
    );
    console.log(response);
    return response;
  }, */
};
