import axios, { AxiosInstance } from "axios";
import { Token, getTokensLocalStorage } from "..";

function api(): AxiosInstance {
  const token = getTokensLocalStorage() as Token;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
}

export default api;
