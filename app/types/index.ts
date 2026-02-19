export interface ServiceImage {
  url: string;
  public_id: string;
  _id: string;
}

export interface ServiceCategory {
  _id: string;
  name: string;
  icon: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  features: string[];
  images: ServiceImage[];
  popular?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProjectImage {
  url: string;
  public_id: string;
  _id: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  client?: string;
  location?: string;
  duration?: string;
  dateCompleted?: string;
  status: 'completed' | 'ongoing' | 'planned';
  featured?: boolean;
  services: { _id: string; title: string }[];
  images?: ProjectImage[];
  budget?: { min: number; max: number };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ServiceFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
}

export interface ProjectFilters {
  status?: Project['status'];
  featured?: boolean;
  search?: string;
  location?: string;
  category?: string;
  client?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  profilePic?: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
