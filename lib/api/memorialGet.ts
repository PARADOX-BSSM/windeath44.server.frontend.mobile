import axiosInstance from './axiosInstance';
import { memorial } from './config';

export interface MemorialData {
  memorialId: number;
  characterId: number;
  chiefs: string[];
  bowCount: number;
  memorialCommitId: number;
  content: string;
  userId: string;
  createdAt: string;
  mergerId: string;
  updatedAt: string;
}

interface MemorialDataResponse {
  message: string;
  data: MemorialData;
}

export const getMemorial = async (id: number): Promise<MemorialDataResponse> => {
  const response = await axiosInstance.get(`${memorial}/${id}`);
  return response.data;
};
