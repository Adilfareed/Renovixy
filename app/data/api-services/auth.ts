import { api } from "./api";

/* =======================
   Types
======================= */

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
};

export type CheckUsernameRequest = {
  username: string;
};

export type CheckEmailRequest = {
  email: string;
};

export type DeleteAccountRequest = {
  password: string;
};

export type UpdateProfileRequest = {
  username?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  profilePicture?: File;
};

export type UserProfile = {
  _id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  profilePic?: {
    url: string;
    public_id: string;
  };
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type AuthResponse = {
  user: UserProfile;
  token: string;
};

export type CheckAvailabilityResponse = {
  success: boolean;
  available: boolean;
  message?: string;
};

/* =======================
   API Functions
======================= */

export const login = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", payload);
  return response.data.data;
};

export const register = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/register", payload);
  return response.data.data;
};

export const checkUsername = async (
  payload: CheckUsernameRequest
): Promise<CheckAvailabilityResponse> => {
  const response = await api.get(
    `/api/auth/check-username`,
    {
      params: {
        username: payload.username,
      },
    }
    
  );
  return (response.data as unknown) as CheckAvailabilityResponse;
};

export const checkEmail = async (
  payload: CheckEmailRequest
): Promise<CheckAvailabilityResponse> => {
  const response = await api.post(
    "/api/auth/check-email",
    payload
  );
  return (response.data as unknown) as CheckAvailabilityResponse;
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>("/api/auth/me");
  return response.data.data;
};

export const deleteAccount = async (
  payload: DeleteAccountRequest
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>("/api/auth/delete", {
    data: payload,
  });
  return response.data.data;
};

export const updateProfile = async (
  formData: FormData
): Promise<UserProfile> => {
  const response = await api.put<UserProfile>("/api/users/profile", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data;
};
