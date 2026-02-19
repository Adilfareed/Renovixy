"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServiceCategories,
  getServiceCategoryById,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  type GetServiceCategoriesRequest,
  type CreateServiceCategoryRequest,
  type UpdateServiceCategoryRequest,
  type ServiceCategoryResponse,
  type ServiceCategory,
} from "@/app/data/api-services/service-categories";

/* =======================
   Query Keys
======================= */

export const serviceCategoriesKeys = {
  all: ["service-categories"] as const,
  lists: () => [...serviceCategoriesKeys.all, "list"] as const,
  list: (params: any) => [...serviceCategoriesKeys.lists(), params] as const,
  details: () => [...serviceCategoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceCategoriesKeys.details(), id] as const,
};

/* =======================
   Auto Fetch (useQuery)
======================= */

export function useGetServiceCategories(params?: GetServiceCategoriesRequest) {
  const { data, isLoading, error, refetch } = useQuery<ServiceCategoryResponse, Error>({
    queryKey: serviceCategoriesKeys.list(params || {}),
    queryFn: () => getServiceCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    categories: data?.categories || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
}

export function useGetServiceCategoryById(id: string, enabled: boolean = true) {
  const { data, isLoading, error, refetch } = useQuery<ServiceCategory, Error>({
    queryKey: serviceCategoriesKeys.detail(id),
    queryFn: () => getServiceCategoryById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    category: data,
    isLoading,
    error,
    refetch,
  };
}

/* =======================
   Manual Trigger (useMutation)
======================= */

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<ServiceCategory, Error, CreateServiceCategoryRequest>({
    mutationFn: createServiceCategory,
    onSuccess: (data: ServiceCategory) => {
      // Invalidate categories list to refetch
      queryClient.invalidateQueries({ queryKey: serviceCategoriesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service category creation failed:', error);
    },
  });
}

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<ServiceCategory, Error, { id: string; data: UpdateServiceCategoryRequest }>({
    mutationFn: ({ id, data }) => updateServiceCategory(id, data),
    onSuccess: (data: ServiceCategory, { id }: { id: string }) => {
      // Update specific category cache
      queryClient.setQueryData(serviceCategoriesKeys.detail(id), data);
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: serviceCategoriesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service category update failed:', error);
    },
  });
}

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteServiceCategory,
    onSuccess: (_: any, id: string) => {
      // Remove category from cache
      queryClient.removeQueries({ queryKey: serviceCategoriesKeys.detail(id) });
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: serviceCategoriesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service category deletion failed:', error);
    },
  });
}

/* =======================
   Utility Hooks
======================= */

export function useSearchServiceCategories(searchTerm: string, enabled: boolean = true) {
  const { categories, isLoading, error } = useGetServiceCategories({
    search: searchTerm,
  });

  // Filter categories locally if search term is provided
  const filteredCategories = searchTerm
    ? categories.filter((category: ServiceCategory) =>
        category.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  return {
    categories: filteredCategories,
    isLoading,
    error,
  };
}

export function useGetActiveServiceCategories() {
  const { categories, isLoading, error } = useGetServiceCategories();

  return {
    categories,
    isLoading,
    error,
  };
}

export function useGetServiceCategoryByName(name: string) {
  const { categories, isLoading, error } = useGetServiceCategories();

  const category = categories.find((cat: ServiceCategory) =>
    cat.name.toLowerCase() === name.toLowerCase()
  );

  return {
    category,
    isLoading,
    error,
  };
}
