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
};

/* =======================
   API Functions
======================= */

export const getServiceCategories = async (
  params?: GetServiceCategoriesRequest
): Promise<ServiceCategoryResponse> => {
  const response = await api.get<ServiceCategoryResponse>("/api/service-categories", {
    params,
  });
  return response.data.data;
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
