// Component-specific types

// FAQ Component Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  items?: FAQItem[];
}

// Service Component Types
export interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  index: number;
}

export interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
}

export interface ServiceFiltersProps {
  filters: ServiceFilters;
  onChange: (filters: ServiceFilters) => void;
  categories: string[];
}

// Project Component Types
export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export interface ProjectDetailModalProps {
  project: Project;
  onClose?: () => void;
}

export interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  onChange: (filters: ProjectFiltersType) => void;
  categories: string[];
  statuses: Project['status'][];
}

// UI Component Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

// Image Carousel Types
export interface ImageCarouselProps {
  images: string[];
  alt: string;
  showThumbnails?: boolean;
  showFullscreen?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

// Form Component Types
export interface QuoteFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface QuoteFormProps {
  onSubmit?: (data: QuoteFormData) => void;
  className?: string;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavbarProps {
  links?: NavLink[];
  logo?: string;
  className?: string;
}

// Review Component Types
export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  project: string;
  image?: string;
  date?: string;
}

export interface ReviewsSectionProps {
  reviews?: Review[];
  showWhatsApp?: boolean;
}

// Stats Component Types
export interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
}

export interface StatsProps {
  stats: Stat[];
  animated?: boolean;
}

// Hero Section Types
export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  backgroundImage?: string;
  showQuoteForm?: boolean;
}

// Footer Types
export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: Array<{
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

// Dashboard Types
export interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  budget: string;
  timeline: string;
}

export interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export interface StatusFilterProps {
  status: string;
  setStatus: (status: string) => void;
}

export interface OrderDetailsProps {
  orderId: string;
}

// Page Component Types
export interface ServicesPageProps {
  initialFilters?: ServiceFilters;
}

export interface ProjectsPageProps {
  initialFilters?: ProjectFiltersType;
}

export interface HomePageProps {
  heroContent?: {
    title: string;
    subtitle: string;
  };
}

// Layout Component Types
export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
}

// Import base types
import { Service, Project, ServiceFilters, ProjectFilters as ProjectFiltersType } from './index';
