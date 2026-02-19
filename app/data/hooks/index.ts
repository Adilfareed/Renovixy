/* =======================
   API Hooks Exports
======================= */

// Auth hooks
export {
  useGetCurrentUser,
  useCheckUsername,
  useCheckEmail,
  useLogin,
  useRegister,
  useCheckUsernameMutation,
  useCheckEmailMutation,
  useDeleteAccount,
  useLogout,
  useIsAuthenticated,
  authKeys,
} from "./useAuth";

// User hooks
export {
  useGetAllUsers,
  useGetUserById,
  useUpdateProfile,
  useUpdateProfilePicture,
  useDeleteUser,
  useUpdateUserRole,
  useSearchUsers,
  usersKeys,
} from "./useUsers";

// Project hooks
export {
  useGetProjects,
  useGetProjectById,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useSearchProjects,
  useFilterProjects,
  projectsKeys,
} from "./useProjects";

// Service hooks
export {
  useGetServices,
  useGetServiceById,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useSearchServices,
  useFilterServices,
  useGetPopularServices,
  servicesKeys,
} from "./useServices";

// Service Category hooks
export {
  useGetServiceCategories,
  useGetServiceCategoryById,
  useCreateServiceCategory,
  useUpdateServiceCategory,
  useDeleteServiceCategory,
  useSearchServiceCategories,
  useGetActiveServiceCategories,
  useGetServiceCategoryByName,
  serviceCategoriesKeys,
} from "./useServiceCategories";

// Re-export types from API services
export type {
  LoginRequest,
  RegisterRequest,
  CheckUsernameRequest,
  CheckEmailRequest,
  DeleteAccountRequest,
  AuthResponse,
  CheckAvailabilityResponse,
  UserProfile,
} from "@/app/data/api-services/auth";

export type {
  UpdateProfileRequest,
  UpdateProfilePictureRequest,
  UpdateProfileResponse,
  UpdateProfilePictureResponse,
  GetAllUsersResponse,
} from "@/app/data/api-services/users";

export type {
  GetProjectsRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectResponse,
  
} from "@/app/data/api-services/projects";

export type {
  GetServicesRequest,
  CreateServiceRequest,
  UpdateServiceRequest,
  ServiceResponse,
  Service,
} from "@/app/data/api-services/services";

export type {
  GetServiceCategoriesRequest,
  CreateServiceCategoryRequest,
  UpdateServiceCategoryRequest,
  ServiceCategoryResponse,
  ServiceCategory,
} from "@/app/data/api-services/service-categories";

// Re-export types from types file for components
export type {
  ProjectFilters,
  ServiceFilters,
} from "@/app/types";
