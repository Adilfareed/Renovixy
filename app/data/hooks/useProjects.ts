"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  type GetProjectsRequest,
  type CreateProjectRequest,
  type UpdateProjectRequest,
  type ProjectResponse,
} from "@/app/data/api-services/projects";
import type { Project } from "@/app/types";

/* =======================
   Query Keys
======================= */

export const projectsKeys = {
  all: ["projects"] as const,
  lists: () => [...projectsKeys.all, "list"] as const,
  list: (params: any) => [...projectsKeys.lists(), params] as const,
  details: () => [...projectsKeys.all, "detail"] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
};

/* =======================
   Auto Fetch (useQuery)
======================= */

export function useGetProjects(params?: GetProjectsRequest) {
  const { data, isLoading, error, refetch } = useQuery<ProjectResponse, Error>({
    queryKey: projectsKeys.list(params || {}),
    queryFn: () => getProjects(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    projects: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
    data
  };
}

export function useGetProjectById(id: string, enabled: boolean = true) {
  const { data, isLoading, error, refetch } = useQuery<Project, Error>({
    queryKey: projectsKeys.detail(id),
    queryFn: () => getProjectById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    project: data,
    isLoading,
    error,
    refetch,
  };
}

/* =======================
   Manual Trigger (useMutation)
======================= */

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, FormData>({
    mutationFn: createProject,
    onSuccess: (data: Project) => {
      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Project creation failed:', error);
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; data: UpdateProjectRequest }>({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: (data: Project, { id }: { id: string }) => {
      // Update specific project cache
      queryClient.setQueryData(projectsKeys.detail(id), data);
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Project update failed:', error);
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteProject,
    onSuccess: (_: any, id: string) => {
      // Remove project from cache
      queryClient.removeQueries({ queryKey: projectsKeys.detail(id) });
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error: Error) => {
      console.error('Project deletion failed:', error);
    },
  });
}

/* =======================
   Utility Hooks
======================= */

export function useSearchProjects(searchTerm: string, enabled: boolean = true) {
  const { projects, isLoading, error } = useGetProjects({
    search: searchTerm,
  });

  // Filter projects locally if search term is provided
  const filteredProjects = searchTerm
    ? projects.filter((project: Project) =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  return {
    projects: filteredProjects,
    isLoading,
    error,
  };
}

export function useFilterProjects(filters: {
  status?: Project['status'];
  featured?: boolean;
  location?: string;
}, enabled: boolean = true) {
  const { projects, isLoading, error } = useGetProjects();

  // Filter projects locally based on provided filters
  const filteredProjects = projects.filter((project: Project) => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.featured !== undefined && project.featured !== filters.featured) return false;
    if (filters.location && project.location !== filters.location) return false;
    return true;
  });

  return {
    projects: filteredProjects,
    isLoading,
    error,
  };
}
