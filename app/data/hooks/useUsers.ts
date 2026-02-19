"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  type UpdateProfileRequest,
  type UpdateProfilePictureRequest,
  type UpdateProfileResponse,
  type UpdateProfilePictureResponse,
  type GetAllUsersResponse,
  type UserProfile,
} from "@/app/data/api-services/users";

/* =======================
   Query Keys
======================= */

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params: any) => [...usersKeys.lists(), params] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  current: () => [...usersKeys.all, "current"] as const,
};

/* =======================
   Auto Fetch (useQuery)
======================= */

export function useGetAllUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) {
  const { data, isLoading, error, refetch } = useQuery<GetAllUsersResponse, Error>({
    queryKey: usersKeys.list(params || {}),
    queryFn: () => getAllUsers(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: data?.data || [],
    count: Number(data?.count) || 0,
    total: Number(data?.total) || 0,
    page: Number(data?.page) || 1,
    pages: Number(data?.pages) || 1,
    success: data?.success || false,
    isLoading,
    error,
    refetch,
  };
}

export function useGetUserById(userId: string, enabled: boolean = true) {
  const { data, isLoading, error, refetch } = useQuery<UserProfile, Error>({
    queryKey: usersKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    user: data,
    isLoading,
    error,
    refetch,
  };
}

/* =======================
   Manual Trigger (useMutation)
======================= */

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (data: UpdateProfileResponse) => {
      // Update current user cache
      queryClient.setQueryData(usersKeys.current(), data.user);
      queryClient.invalidateQueries({ queryKey: usersKeys.current() });
      
      // Update user in lists if present
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Profile update failed:', error);
    },
  });
}

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfilePictureResponse, Error, UpdateProfilePictureRequest>({
    mutationFn: updateProfilePicture,
    onSuccess: (data: UpdateProfilePictureResponse, variables: UpdateProfilePictureRequest) => {
      // Update current user cache with new profile picture
      queryClient.setQueryData(usersKeys.current(), (old: UserProfile | undefined) => {
        if (!old) return old;
        return {
          ...old,
          profilePic: data.profilePic,
        };
      });
      
      // Invalidate current user query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: usersKeys.current() });
      
      // Update user in lists if present
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Profile picture update failed:', error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteUser,
    onSuccess: (_: any, userId: string) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: usersKeys.detail(userId) });
      
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('User deletion failed:', error);
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string; user: UserProfile }, Error, { userId: string; role: string }>({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: (data: { message: string; user: UserProfile }, { userId }: { userId: string }) => {
      // Update user cache
      queryClient.setQueryData(usersKeys.detail(userId), data.user);
      
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('User role update failed:', error);
    },
  });
}

/* =======================
   Utility Hooks
======================= */

export function useSearchUsers(searchTerm: string, enabled: boolean = true) {
  const { data: users, isLoading, error } = useGetAllUsers({
    search: searchTerm,
  });

  // Filter users locally if search term is provided
  const filteredUsers = searchTerm
    ? users.filter((user: UserProfile) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return {
    users: filteredUsers,
    isLoading,
    error,
  };
}
