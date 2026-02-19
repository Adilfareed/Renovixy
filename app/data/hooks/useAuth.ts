"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  checkUsername,
  checkEmail,
  getCurrentUser,
  deleteAccount,
  updateProfile,
  type LoginRequest,
  type RegisterRequest,
  type CheckUsernameRequest,
  type CheckEmailRequest,
  type DeleteAccountRequest,
  type AuthResponse,
  type CheckAvailabilityResponse,
  type UserProfile,
} from "@/app/data/api-services/auth";
import { useAppDispatch } from "@/app/redux/store/hooks";
import { logoutUser } from "@/app/redux/features/authSlice";

/* =======================
   Query Keys
======================= */

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  currentUser: () => [...authKeys.user(), "current"] as const,
  checkUsername: (username: string) => [...authKeys.all, "check-username", username] as const,
  checkEmail: (email: string) => [...authKeys.all, "check-email", email] as const,
};

/* =======================
   Auto Fetch (useQuery)
======================= */

export function useGetCurrentUser(enabled: boolean = true) {
  // Check if token exists before enabling the query
  const hasToken = typeof window !== 'undefined' && 
    (localStorage.getItem('token') || localStorage.getItem('renovixy_auth_token'));
  
  const { data, isLoading, error, refetch } = useQuery<UserProfile, Error>({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    enabled: enabled && !!hasToken, // Only enable if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry for unauthenticated users
  });

  return { 
    user: data as UserProfile, 
    isLoading, 
    error, 
    refetch 
  };
}

export function useCheckUsername(username: string) {
  const enabled = username.length >= 3;
  const { data, isLoading, error } = useQuery<CheckAvailabilityResponse, Error>({
    queryKey: authKeys.checkUsername(username),
    queryFn: () => checkUsername({ username }),
    enabled: enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return { 
    isAvailable: data?.available, 
    isLoading, 
    error 
  };
}

export function useCheckEmail(email: string, enabled: boolean = false) {
  const { data, isLoading, error } = useQuery<CheckAvailabilityResponse, Error>({
    queryKey: authKeys.checkEmail(email),
    queryFn: () => checkEmail({ email }),
    enabled: enabled && email.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return { 
    isAvailable: data?.available, 
    isLoading, 
    error 
  };
}

/* =======================
   Manual Trigger (useMutation)
======================= */

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('renovixy_auth_token', data.token);
      
      // Update user cache
      queryClient.setQueryData(authKeys.currentUser(), data.user);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('renovixy_auth_token', data.token);
      
      // Update user cache
      queryClient.setQueryData(authKeys.currentUser(), data.user);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error: Error) => {
      console.error('Registration failed:', error);
    },
  });
}

export function useCheckUsernameMutation() {
  return useMutation<CheckAvailabilityResponse, Error, CheckUsernameRequest>({
    mutationFn: checkUsername,
  });
}

export function useCheckEmailMutation() {
  return useMutation<CheckAvailabilityResponse, Error, CheckEmailRequest>({
    mutationFn: checkEmail,
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, DeleteAccountRequest>({
    mutationFn: deleteAccount,
    onSuccess: () => {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('renovixy_auth_token');
      
      // Clear all cache
      queryClient.clear();
      
      // Redirect to login
      window.location.href = '/login';
    },
    onError: (error: Error) => {
      console.error('Account deletion failed:', error);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, FormData>({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      // Update user cache
      queryClient.setQueryData(authKeys.currentUser(), updatedUser);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error: Error) => {
      console.error('Profile update failed:', error);
    },
  });
}

/* =======================
   Utility Hooks
======================= */

export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const logout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('renovixy_auth_token');
    
    // Clear all cache
    queryClient.clear();
    
    // Clear Redux state
    dispatch(logoutUser());
    
    // Use window.location for now to ensure clean state
    window.location.href = '/login';
  };

  return { logout };
}

export function useIsAuthenticated() {
  // Check if token exists before trying to get current user
  const hasToken = typeof window !== 'undefined' && 
    (localStorage.getItem('token') || localStorage.getItem('renovixy_auth_token'));
  
  const { user, isLoading, error } = useGetCurrentUser(!!hasToken); // Only enable if token exists
  
  return {
    isAuthenticated: !!user && !!hasToken,
    isLoading: hasToken ? isLoading : false, // Don't show loading if no token
    user,
    error: hasToken ? error : null,
  };
}
