import axios from 'axios';
import axiosInstance from './axiosInstance';
import qs from 'qs';
import { user, auth } from './config';

interface SignUpParams {
  name: string;
  userId: string;
  email: string;
  password: string;
}

interface EmailValidationParams {
  email: string;
}

interface VerifyEmailParams {
  email: string;
  authorizationCode: string;
}

export interface UserData {
  userId: string;
  name: string;
  realinToken: number;
  profile: string;
  role: string;
}

interface GetUsersResponse {
  message: string;
  data: UserData[];
}

export const signUp = async ({
  name,
  userId,
  email,
  password,
}: SignUpParams): Promise<boolean> => {
  const data = {
    userId,
    email,
    name,
    password,
  };
  try {
    await axios.post(`${user}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const emailValidationRequest = async ({
  email,
}: EmailValidationParams): Promise<boolean> => {
  try {
    await axios.post(
      `${auth}/email`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return true;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmailCode = async ({
  email,
  authorizationCode,
}: VerifyEmailParams): Promise<boolean> => {
  const data = {
    authorizationCode,
    email,
  };
  try {
    await axios.patch(`${auth}/email/valid`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (userIds: string[]): Promise<UserData[]> => {
  try {
    const response = await axios.get<GetUsersResponse>(`${user}`, {
      params: { userIds },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

interface GetCurrentUserResponse {
  message: string;
  data: UserData;
}

export const getCurrentUser = async (): Promise<UserData> => {
  try {
    const response = await axiosInstance.get<GetCurrentUserResponse>(`${user}/profile`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    throw error;
  }
};
