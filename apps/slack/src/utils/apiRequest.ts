import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import logger from "./logger";

interface ApiRequestOptions {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  headers?: Record<string, string>;
  data?: unknown;
}

export async function apiRequest<T>(options: ApiRequestOptions): Promise<T> {
  const config: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    data: options.data,
  };

  try {
    const response: AxiosResponse<T> = await axios.request(config);
    return response.data;
  } catch (error) {
    logger.error(`API request failed: ${error}`);
    throw error;
  }
}
