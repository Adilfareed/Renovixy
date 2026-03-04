import { api } from "./api";

/* =======================
   Types
======================= */

export type GetServiceCategoriesRequest = {
  page?: number;
  limit?: number;
  search?: string;
};

export type CreateServiceCategoryRequest = {
  name: string;
  icon: string;
};

export type UpdateServiceCategoryRequest = {
  name?: string;
  icon?: string;
};

export type ServiceCategoriesApiResponse = {
  success: boolean;
  count: number;
  data: ServiceCategory[];
};

export type ServiceCategoryResponse = {
  categories: ServiceCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ServiceCategory = {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

/* =======================
   API Functions
======================= */

export const getServiceCategories = async (
  params?: GetServiceCategoriesRequest
): Promise<ServiceCategoryResponse> => {
  const response = await api.get("/api/service-categories", {
    params,
  });
  return {
    categories: (response.data as any).data,
    pagination: {
      page: 1,
      limit: (response.data as any).count || 10,
      total: (response.data as any).count || (response.data as any).data.length,
      totalPages: 1,
    },
  };
};

export const getServiceCategoryById = async (id: string): Promise<ServiceCategory> => {
  const response = await api.get<ServiceCategory>(`/api/service-categories/${id}`);
  return response.data.data;
};

export const createServiceCategory = async (
  payload: CreateServiceCategoryRequest
): Promise<ServiceCategory> => {
  const response = await api.post<ServiceCategory>("/api/service-categories", payload);
  return response.data.data;
};

export const updateServiceCategory = async (
  id: string,
  payload: UpdateServiceCategoryRequest
): Promise<ServiceCategory> => {
  const response = await api.put<ServiceCategory>(`/api/service-categories/${id}`, payload);
  return response.data.data;
};

export const deleteServiceCategory = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/api/service-categories/${id}`);
  return response.data.data;
};
