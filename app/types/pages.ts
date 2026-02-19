// Page-specific types

// Services Page Types
export interface ServicesPageState {
  filteredServices: Service[];
  searchTerm: string;
  filters: ServiceFilters;
  showFilters: boolean;
  selectedService: Service | null;
  loading: boolean;
  error: string | null;
}

export interface ServicesPageHandlers {
  handleSearch: (value: string) => void;
  handleFilterChange: (filters: ServiceFilters) => void;
  onToggleFilters: () => void;
  onServiceClick: (service: Service) => void;
  onCloseModal: () => void;
  handleRetry: () => void;
}

// Projects Page Types
export interface ProjectsPageState {
  filteredProjects: Project[];
  searchTerm: string;
  filters: ProjectFiltersType;
  showFilters: boolean;
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}

export interface ProjectsPageHandlers {
  handleSearch: (value: string) => void;
  handleFilterChange: (filters: ProjectFiltersType) => void;
  onToggleFilters: () => void;
  onProjectClick: (project: Project) => void;
  onCloseModal: () => void;
  handleRetry: () => void;
}

// Home Page Types
export interface HomePageState {
  loading: boolean;
  error: string | null;
}

export interface HomePageSections {
  hero: boolean;
  services: boolean;
  projects: boolean;
  reviews: boolean;
  about: boolean;
  contact: boolean;
}

// Dashboard Page Types
export interface DashboardPageState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  statusFilter: string;
  showModal: boolean;
}

export interface DashboardPageHandlers {
  handleStatusFilter: (status: string) => void;
  handleAddOrder: () => void;
  handleCloseModal: () => void;
  handleOrderClick: (orderId: string) => void;
  handleRetry: () => void;
}

// Order Detail Page Types
export interface OrderDetailPageState {
  order: Order | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

export interface OrderDetailPageHandlers {
  handleStatusUpdate: (status: Order['status']) => void;
  handleRetry: () => void;
}

// Auth Page Types
export interface AuthPageState {
  formData: {
    email: string;
    password: string;
    name?: string;
  };
  loading: boolean;
  error: string | null;
  isLogin: boolean;
}

export interface AuthPageHandlers {
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  toggleMode: () => void;
  handleRetry: () => void;
}

// Contact Page Types
export interface ContactPageState {
  formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  loading: boolean;
  submitted: boolean;
  error: string | null;
}

export interface ContactPageHandlers {
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRetry: () => void;
}

// Generic Page Types
export interface BasePageState {
  loading: boolean;
  error: string | null;
}

export interface BasePageHandlers {
  handleRetry: () => void;
}

// SEO and Meta Types
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface PageSEO {
  meta: PageMeta;
  structuredData?: Record<string, any>;
}

// Layout Types
export interface PageLayout {
  header: boolean;
  footer: boolean;
  sidebar?: boolean;
  breadcrumbs?: boolean;
}

// Navigation Types
export interface PageNavigation {
  prev?: {
    href: string;
    label: string;
  };
  next?: {
    href: string;
    label: string;
  };
}

// Import base types
import { Service, Project, ServiceFilters, ProjectFilters as ProjectFiltersType, Order } from './index';
