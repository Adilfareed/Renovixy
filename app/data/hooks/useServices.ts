"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  type GetServicesRequest,
  type CreateServiceRequest,
  type UpdateServiceRequest,
  type ServiceResponse,
  type Service,
} from "@/app/data/api-services/services";

/* =======================
   Query Keys
======================= */

export const servicesKeys = {
  all: ["services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
  list: (params: any) => [...servicesKeys.lists(), params] as const,
  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (id: string) => [...servicesKeys.details(), id] as const,
};

/* =======================
   Auto Fetch (useQuery)
======================= */

export function useGetServices(params?: GetServicesRequest) {
  const { data, isLoading, error, refetch } = useQuery<ServiceResponse, Error>({
    queryKey: servicesKeys.list(params || {}),
    queryFn: () => getServices(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    services: data?.services || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
}

export function useGetServiceById(id: string, enabled: boolean = true) {
  const { data, isLoading, error, refetch } = useQuery<Service, Error>({
    queryKey: servicesKeys.detail(id),
    queryFn: () => getServiceById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    service: data,
    isLoading,
    error,
    refetch,
  };
}

/* =======================
   Manual Trigger (useMutation)
======================= */

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation<Service, Error, CreateServiceRequest>({
    mutationFn: createService,
    onSuccess: (data: Service) => {
      // Invalidate services list to refetch
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service creation failed:', error);
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation<Service, Error, { id: string; data: UpdateServiceRequest }>({
    mutationFn: ({ id, data }) => updateService(id, data),
    onSuccess: (data: Service, { id }: { id: string }) => {
      // Update specific service cache
      queryClient.setQueryData(servicesKeys.detail(id), data);
      // Invalidate services list
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service update failed:', error);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteService,
    onSuccess: (_: any, id: string) => {
      // Remove service from cache
      queryClient.removeQueries({ queryKey: servicesKeys.detail(id) });
      // Invalidate services list
      queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Service deletion failed:', error);
    },
  });
}

/* =======================
   Utility Hooks
======================= */

export function useSearchServices(searchTerm: string, enabled: boolean = true) {
  const { services, isLoading, error } = useGetServices({
    search: searchTerm,
  });

  // Filter services locally if search term is provided
  const filteredServices = searchTerm
    ? services.filter((service: Service) =>
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : services;

  return {
    services: filteredServices,
    isLoading,
    error,
  };
}

export function useFilterServices(filters: {
  category?: string;
  popular?: boolean;
  featured?: boolean;
}, enabled: boolean = true) {
  const { services, isLoading, error } = useGetServices();

  // Filter services locally based on provided filters
  const filteredServices = services.filter((service: Service) => {
    if (filters.category && service.category._id !== filters.category) return false;
    if (filters.popular !== undefined && service.popular !== filters.popular) return false;
    if (filters.featured !== undefined && service.popular !== filters.featured) return false;
    return true;
  });

  return {
    services: filteredServices,
    isLoading,
    error,
  };
}

export function useGetPopularServices(limit: number = 6) {
  const { services, isLoading, error } = useGetServices({
    popular: true,
    limit,
  });

  return {
    services,
    isLoading,
    error,
  };
}
