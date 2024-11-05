import { User } from '@ideal-enigma/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from './session';

interface ApiRequestOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  endpoint: string;
  headers?: Record<string, string>;
  data?: unknown;
}

export async function api<T>(options: ApiRequestOptions): Promise<T> {
  const session = await getSession();

  const config: AxiosRequestConfig = {
    method: options.method,
    url: `${process.env.BACKEND_URL}/${options.endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
      ...options.headers,
    },
    data: options.data,
  };

  try {
    const response: AxiosResponse<T> = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(`Backend request failed: ${error}`);
    throw error;
  }
}

export async function getSessionUser(): Promise<User> {
  const session = await getSession();
  const response: User = await api({
    method: 'get',
    endpoint: `users/${session.payload.sub}`,
  });

  return response;
}
