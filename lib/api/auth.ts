import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { auth as authEndpoint } from './config';

interface LoginParams {
  id: string;
  password: string;
}

// 쿠키 설정 함수 (localStorage 대신 쿠키 사용)
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const logIn = async ({ id, password }: LoginParams): Promise<string> => {
  const data = { userId: id, password };
  try {
    const response: AxiosResponse = await axiosInstance.post(`${authEndpoint}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    const accessToken: string | undefined = response.headers['authorization'];
    if (!accessToken) throw new Error('accessToken 없음');

    setCookie('access_token', accessToken, 1);
    return accessToken;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await axiosInstance.post(`${authEndpoint}/logout`, {}, {
      withCredentials: true,
    });
  } finally {
    deleteCookie('access_token');
  }
};

export const getAccessToken = (): string | null => {
  return getCookie('access_token');
};
