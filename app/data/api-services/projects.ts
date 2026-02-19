import { api } from "./api";
import type { Project } from "../../types";

/* =======================
   Types
======================= */

export type GetProjectsRequest = {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'completed' | 'ongoing' | 'planned';
  featured?: boolean;
  location?: string;
};

export type CreateProjectRequest = {
  title: string;
  description: string;
  category: string;
  client: string;
  location: string;
  duration: string;
  dateCompleted: string;
  status: 'completed' | 'ongoing' | 'planned';
  featured?: boolean;
  services: string[];
  budget: { min: number; max: number };
  images?: File[];
};

export type UpdateProjectRequest = {
  title?: string;
  description?: string;
  status?: 'completed' | 'ongoing' | 'planned';
  featured?: boolean;
  services?: string[];
  location?: string;
  dateCompleted?: string;
  images?: File[];
};

export type ProjectResponse = {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/* =======================
   API Functions
======================= */

export const getProjects = async (
  params?: GetProjectsRequest
): Promise<any> => {
  const response = await api.get<ProjectResponse>("/api/projects", {
    params,
  });
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get<Project>(`/api/projects/${id}`);
  return response.data.data;
};

export const createProject = async (formData: FormData): Promise<Project> => {
  const response = await api.post<Project>("/api/projects", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const updateProject = async (
  id: string,
  payload: UpdateProjectRequest
): Promise<Project> => {
  const formData = new FormData();

  if (payload.title) formData.append('title', payload.title);
  if (payload.description) formData.append('description', payload.description);
  if (payload.status) formData.append('status', payload.status);
  if (payload.featured !== undefined) formData.append('featured', payload.featured.toString());
  if (payload.services) payload.services.forEach(service => formData.append('services', service));
  if (payload.location) formData.append('location', payload.location);
  if (payload.dateCompleted) formData.append('dateCompleted', payload.dateCompleted);

  if (payload.images) {
    payload.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  }

  const response = await api.put<Project>(`/api/projects/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const deleteProject = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/api/projects/${id}`);
  return response.data.data;
};
