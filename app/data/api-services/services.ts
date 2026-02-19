import { api } from "./api";

/* =======================
   Types
======================= */

export type GetServicesRequest = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  popular?: boolean;
  featured?: boolean;
};

export type CreateServiceRequest = {
  title: string;
  description: string;
  category: string;
  features: string[];
  images?: File[];
  popular?: boolean;
};

export type UpdateServiceRequest = {
  title?: string;
  description?: string;
  category?: string;
  features?: string[];
  images?: File[];
  popular?: boolean;
};

export type ServiceResponse = {
  services: Service[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Service = {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
    icon: string;
  };
  features: string[];
  images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  popular?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/* =======================
   API Functions
======================= */

export const getServices = async (
  params?: GetServicesRequest
): Promise<ServiceResponse> => {
  const response = await api.get("/api/services", {
    params,
  });
  return {
    services: (response.data as any).data,
    pagination: (response.data as any).pagination,
  };
};

export const getServiceById = async (id: string): Promise<Service> => {
  const response = await api.get<Service>(`/api/services/${id}`);
  return response.data.data;
};

export const createService = async (
  payload: CreateServiceRequest
): Promise<Service> => {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('category', payload.category);
  payload.features.forEach(feature => formData.append('features', feature));
  if (payload.popular !== undefined) formData.append('popular', payload.popular.toString());

  if (payload.images) {
    payload.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  }

  const response = await api.post<Service>("/api/services", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const updateService = async (
  id: string,
  payload: UpdateServiceRequest
): Promise<Service> => {
  const formData = new FormData();

  if (payload.title) formData.append('title', payload.title);
  if (payload.description) formData.append('description', payload.description);
  if (payload.category) formData.append('category', payload.category);
  if (payload.features) payload.features.forEach(feature => formData.append('features', feature));
  if (payload.popular !== undefined) formData.append('popular', payload.popular.toString());

  if (payload.images) {
    payload.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  }

  const response = await api.put<Service>(`/api/services/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const deleteService = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/api/services/${id}`);
  return response.data.data;
};
