import { api } from "./api";
import type { UserProfile } from "./auth";

export type { UserProfile } from "./auth";

export type UpdateProfileRequest = {
  username?: string;
  phoneNumber?: string;
  address?: string;
  profilePicture?: File | null;
};

export type UpdateProfileResponse = {
  user: UserProfile;
  message: string;
};

export type UpdateProfilePictureRequest = {
  profilePicture: File;
};

export type UpdateProfilePictureResponse = {
  profilePic: {
    url: string;
    public_id: string;
  };
  message: string;
};

export type GetAllUsersResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: UserProfile[];
};

/* =======================
   API Functions
======================= */

export const updateProfile = async (
  payload: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const formData = new FormData();
  
  if (payload.username) formData.append('username', payload.username);
  if (payload.phoneNumber) formData.append('phoneNumber', payload.phoneNumber);
  if (payload.address) formData.append('address', payload.address);
  if (payload.profilePicture) formData.append('profilePicture', payload.profilePicture);

  const response = await api.put<UpdateProfileResponse>("/api/users/profile", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data;
};

export const updateProfilePicture = async (
  payload: UpdateProfilePictureRequest
): Promise<UpdateProfilePictureResponse> => {
  const formData = new FormData();
  formData.append('profilePicture', payload.profilePicture);

  const response = await api.put<UpdateProfilePictureResponse>(
    "/api/users/profile-picture",
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data.data;
};

export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}): Promise<any> => {
  const response = await api.get<GetAllUsersResponse>("/api/users", {
    params,
  });
  
  return response.data;
};

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const response = await api.get<UserProfile>(`/api/users/${userId}`);
  return response.data.data;
};

export const deleteUser = async (userId: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/api/users/${userId}`);
  return response.data.data;
};

export const updateUserRole = async (
  userId: string,
  role: string
): Promise<{ message: string; user: UserProfile }> => {
  const response = await api.put<{ message: string; user: UserProfile }>(
    `/api/users/${userId}/role`,
    { role }
  );
  return response.data.data;
};
