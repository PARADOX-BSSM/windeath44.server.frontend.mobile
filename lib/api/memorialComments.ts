import axiosInstance from './axiosInstance';
import { memorial } from './config';

export interface MemorialComment {
  commentId: number;
  memorialId: number;
  userId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  parentId: number | null;
  createdAt: string;
  children: MemorialComment[];
}

interface CommentMain {
  hasNext: boolean;
  data: MemorialComment[];
}

interface MemorialCommentsResponse {
  message: string;
  data: CommentMain;
}

interface GetCommentsParams {
  memorialId: number;
  cursorId?: number;
  size?: number;
}

export const getMemorialComments = async ({
  memorialId,
  cursorId,
  size = 10,
}: GetCommentsParams): Promise<MemorialCommentsResponse> => {
  const response = await axiosInstance.get(`${memorial}/comment/${memorialId}`, {
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
    },
  });
  return response.data;
};

interface WriteCommentParams {
  memorialId: number;
  content: string;
  parentCommentId?: number;
}

interface WriteCommentResponse {
  message: string;
  data: MemorialComment;
}

export const writeMemorialComment = async ({
  memorialId,
  content,
  parentCommentId,
}: WriteCommentParams): Promise<WriteCommentResponse> => {
  const data = { memorialId, content, parentCommentId };
  const response = await axiosInstance.post(`${memorial}/comment/${memorialId}`, data);
  return response.data;
};

interface UpdateCommentParams {
  commentId: number;
  content: string;
}

interface UpdateCommentResponse {
  message: string;
  data: MemorialComment;
}

export const updateMemorialComment = async ({
  commentId,
  content,
}: UpdateCommentParams): Promise<UpdateCommentResponse> => {
  const response = await axiosInstance.patch(`${memorial}/comment/${commentId}`, { content });
  return response.data;
};

interface DeleteCommentParams {
  commentId: number;
}

interface DeleteCommentResponse {
  message: string;
}

export const deleteMemorialComment = async ({
  commentId,
}: DeleteCommentParams): Promise<DeleteCommentResponse> => {
  const response = await axiosInstance.delete(`${memorial}/comment/${commentId}`);
  return response.data;
};

interface LikeCommentParams {
  commentId: number;
  isLiked: boolean;
}

interface LikeCommentResponse {
  message: string;
}

export const likeMemorialComment = async ({
  commentId,
  isLiked,
}: LikeCommentParams): Promise<LikeCommentResponse> => {
  if (isLiked) {
    // 이미 좋아요 되어있으면 DELETE (좋아요 취소)
    const response = await axiosInstance.delete(`${memorial}/comment/likes/${commentId}`);
    return response.data;
  } else {
    // 좋아요 안 되어있으면 POST (좋아요)
    const response = await axiosInstance.post(`${memorial}/comment/likes/${commentId}`);
    return response.data;
  }
};
