"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CONFIG, getAuthToken } from "@/app/config/api";
import axios from "axios";
import { Order } from "@/app/redux/features/orderSlice";

export const orderKeys = {
  all: ["orders"] as const,
  userOrders: () => [...orderKeys.all, "user"] as const,
  order: (id: string) => [...orderKeys.all, id] as const,
};

// Fetch user orders
export function useUserOrders() {
  const { data, isLoading, error, refetch } = useQuery<Order[], Error>({
    queryKey: orderKeys.userOrders(),
    queryFn: async () => {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token');
      
      const response = await axios.get(API_CONFIG.ENDPOINTS.ORDERS.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data.data;
    },
    enabled: !!getAuthToken(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return { 
    orders: data || [], 
    isLoading, 
    error, 
    refetch 
  };
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, FormData>({
    mutationFn: async (formData) => {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token');
      
      const response = await axios.post(API_CONFIG.ENDPOINTS.ORDERS.CREATE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate orders cache to refetch
      queryClient.invalidateQueries({ queryKey: orderKeys.userOrders() });
    },
  });
}

// Update order mutation
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, { id: string; payload: Partial<Order> }>({
    mutationFn: async ({ id, payload }) => {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token');
      
      const response = await axios.put(
        API_CONFIG.ENDPOINTS.ORDERS.UPDATE_STATUS.replace(':id', id), 
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      return response.data.data;
    },
    onSuccess: (updatedOrder) => {
      // Update specific order in cache
      queryClient.setQueryData(
        orderKeys.order(updatedOrder._id),
        updatedOrder
      );
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.userOrders() });
    },
  });
}
